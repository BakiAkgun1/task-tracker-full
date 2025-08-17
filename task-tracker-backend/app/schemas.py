from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime
from app.models import Priority, Category

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200, description="Görev başlığı")
    description: Optional[str] = Field(None, max_length=1000, description="Görev açıklaması")
    completed: bool = Field(default=False, description="Görev tamamlandı mı?")
    priority: Priority = Field(default=Priority.MEDIUM, description="Görev önceliği")
    category: Category = Field(default=Category.OTHER, description="Görev kategorisi")
    due_date: Optional[datetime] = Field(None, description="Bitiş tarihi")

    @validator('title')
    def validate_title(cls, v):
        if not v or not v.strip():
            raise ValueError('Başlık boş olamaz')
        return v.strip()

    @validator('due_date')
    def validate_due_date(cls, v):
        if v and v < datetime.now():
            raise ValueError('Bitiş tarihi geçmişte olamaz')
        return v

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    completed: Optional[bool] = None
    priority: Optional[Priority] = None
    category: Optional[Category] = None
    due_date: Optional[datetime] = None

class Task(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class TaskStats(BaseModel):
    total: int
    completed: int
    pending: int
    by_priority: dict
    by_category: dict
