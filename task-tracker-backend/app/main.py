from fastapi import FastAPI, Depends, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from app import models, schemas, database
from typing import List, Optional
from datetime import datetime
import logging

# Logging yapılandırması
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Task Tracker API",
    description="Gelişmiş Görev Takip Sistemi",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Veritabanı tablolarını oluştur
models.Base.metadata.create_all(bind=database.engine)

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8080"],  # Güvenlik için spesifik originler
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Global exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Sunucu hatası oluştu"}
    )

# Veritabanı oturumu alma fonksiyonu
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/", tags=["Ana Sayfa"])
async def root():
    return {
        "message": "Task Tracker API v2.0", 
        "docs": "/docs",
        "status": "aktif"
    }

@app.get("/health", tags=["Sağlık"])
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

# Görev oluşturma (POST)
@app.post("/tasks/", response_model=schemas.Task, status_code=status.HTTP_201_CREATED, tags=["Görevler"])
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    try:
        db_task = models.Task(**task.dict())
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        logger.info(f"Yeni görev oluşturuldu: {db_task.id}")
        return db_task
    except Exception as e:
        logger.error(f"Görev oluşturma hatası: {e}")
        db.rollback()
        raise HTTPException(status_code=400, detail="Görev oluşturulamadı")

# Tüm görevleri listeleme (GET) - Filtreleme ve sıralama ile
@app.get("/tasks/", response_model=List[schemas.Task], tags=["Görevler"])
def get_tasks(
    skip: int = Query(0, ge=0, description="Atlanacak kayıt sayısı"),
    limit: int = Query(100, ge=1, le=1000, description="Getirilecek maksimum kayıt sayısı"),
    completed: Optional[bool] = Query(None, description="Tamamlanma durumu"),
    priority: Optional[models.Priority] = Query(None, description="Öncelik seviyesi"),
    category: Optional[models.Category] = Query(None, description="Kategori"),
    search: Optional[str] = Query(None, description="Başlık veya açıklamada arama"),
    db: Session = Depends(get_db)
):
    try:
        query = db.query(models.Task)
        
        # Filtreler
        if completed is not None:
            query = query.filter(models.Task.completed == completed)
        if priority:
            query = query.filter(models.Task.priority == priority)
        if category:
            query = query.filter(models.Task.category == category)
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    models.Task.title.ilike(search_term),
                    models.Task.description.ilike(search_term)
                )
            )
        
        # Sıralama: tamamlanmayanlar önce, sonra öncelik, sonra oluşturulma tarihi
        query = query.order_by(
            models.Task.completed.asc(),
            models.Task.priority.desc(),
            models.Task.created_at.desc()
        )
        
        return query.offset(skip).limit(limit).all()
    except Exception as e:
        logger.error(f"Görev listeleme hatası: {e}")
        raise HTTPException(status_code=500, detail="Görevler getirilemedi")

# Tek görev getirme (GET)
@app.get("/tasks/{task_id}", response_model=schemas.Task, tags=["Görevler"])
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Görev bulunamadı")
    return task

# Görev güncelleme (PUT)
@app.put("/tasks/{task_id}", response_model=schemas.Task, tags=["Görevler"])
def update_task(task_id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db)):
    try:
        task = db.query(models.Task).filter(models.Task.id == task_id).first()
        if not task:
            raise HTTPException(status_code=404, detail="Görev bulunamadı")
        
        # Sadece gönderilen alanları güncelle
        update_data = task_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(task, field, value)
        
        db.commit()
        db.refresh(task)
        logger.info(f"Görev güncellendi: {task_id}")
        return task
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Görev güncelleme hatası: {e}")
        db.rollback()
        raise HTTPException(status_code=400, detail="Görev güncellenemedi")

# Görev tamamlama durumunu değiştir (PATCH)
@app.patch("/tasks/{task_id}/toggle", response_model=schemas.Task, tags=["Görevler"])
def toggle_task_completion(task_id: int, db: Session = Depends(get_db)):
    try:
        task = db.query(models.Task).filter(models.Task.id == task_id).first()
        if not task:
            raise HTTPException(status_code=404, detail="Görev bulunamadı")
        
        task.completed = not task.completed
        db.commit()
        db.refresh(task)
        logger.info(f"Görev tamamlama durumu değiştirildi: {task_id} -> {task.completed}")
        return task
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Görev tamamlama hatası: {e}")
        db.rollback()
        raise HTTPException(status_code=400, detail="Görev durumu değiştirilemedi")

# Görev silme (DELETE)
@app.delete("/tasks/{task_id}", tags=["Görevler"])
def delete_task(task_id: int, db: Session = Depends(get_db)):
    try:
        task = db.query(models.Task).filter(models.Task.id == task_id).first()
        if not task:
            raise HTTPException(status_code=404, detail="Görev bulunamadı")
        
        db.delete(task)
        db.commit()
        logger.info(f"Görev silindi: {task_id}")
        return {"message": "Görev başarıyla silindi", "deleted_id": task_id}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Görev silme hatası: {e}")
        db.rollback()
        raise HTTPException(status_code=400, detail="Görev silinemedi")

# İstatistikler endpoint'i
@app.get("/tasks/stats/summary", response_model=schemas.TaskStats, tags=["İstatistikler"])
def get_task_stats(db: Session = Depends(get_db)):
    try:
        all_tasks = db.query(models.Task).all()
        total = len(all_tasks)
        completed = len([t for t in all_tasks if t.completed])
        pending = total - completed
        
        # Öncelik dağılımı
        by_priority = {}
        for priority in models.Priority:
            by_priority[priority.value] = len([t for t in all_tasks if t.priority == priority])
        
        # Kategori dağılımı
        by_category = {}
        for category in models.Category:
            by_category[category.value] = len([t for t in all_tasks if t.category == category])
        
        return schemas.TaskStats(
            total=total,
            completed=completed,
            pending=pending,
            by_priority=by_priority,
            by_category=by_category
        )
    except Exception as e:
        logger.error(f"İstatistik hatası: {e}")
        raise HTTPException(status_code=500, detail="İstatistikler alınamadı")
