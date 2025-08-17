# 🚀 Task Tracker v2.0 - Modern Görev Yönetim Sistemi

Modern, ölçeklenebilir ve Docker tabanlı görev yönetim uygulaması. FastAPI backend ve React frontend ile geliştirilmiş, GitHub Actions ile otomatik CI/CD pipeline'a sahip.

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Hızlı Başlangıç](#-hızlı-başlangıç)
- [Proje Yapısı](#-proje-yapısı)
- [Deployment](#-deployment)
- [API Dokümantasyonu](#-api-dokümantasyonu)
- [Geliştirme](#-geliştirme)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Katkıda Bulunma](#-katkıda-bulunma)

## ✨ Özellikler

### 🎯 Core Özellikler
- ✅ **CRUD İşlemleri**: Görev oluşturma, okuma, güncelleme, silme
- ✅ **Öncelik Seviyeleri**: Düşük, Orta, Yüksek, Acil
- ✅ **Kategoriler**: İş, Kişisel, Alışveriş, Sağlık, Eğitim, Diğer
- ✅ **Bitiş Tarihi**: Görevler için son tarih belirleme
- ✅ **Durum Takibi**: Tamamlandı/Bekliyor durumları
- ✅ **Arama ve Filtreleme**: Gelişmiş filtreleme sistemi

### 🎨 Frontend Özellikleri
- ✅ **Modern UI/UX**: Responsive ve kullanıcı dostu tasarım
- ✅ **İstatistik Dashboard**: Görev durumu özetleri
- ✅ **Real-time Bildirimler**: Toast mesajları
- ✅ **Modal Düzenleme**: Inline görev düzenleme
- ✅ **Tarih Seçici**: Kolay tarih belirleme
- ✅ **Mobil Uyumlu**: Tüm cihazlarda çalışır

### 🔧 Backend Özellikleri
- ✅ **RESTful API**: OpenAPI/Swagger dokümantasyonu
- ✅ **Veri Validasyonu**: Pydantic ile güvenli veri işleme
- ✅ **Hata Yönetimi**: Kapsamlı error handling
- ✅ **Logging**: Detaylı sistem logları
- ✅ **Health Check**: Sistem durumu kontrolü
- ✅ **CORS Desteği**: Cross-origin istekleri

### 🚀 DevOps Özellikleri
- ✅ **Docker Containerization**: Multi-stage build
- ✅ **GitHub Actions CI/CD**: Otomatik deployment
- ✅ **Commit Hash Versioning**: Eşsiz versiyon kontrolü
- ✅ **Health Monitoring**: Container durumu izleme
- ✅ **Environment Management**: Çoklu ortam desteği

## 🛠 Teknolojiler

### Backend
- **FastAPI** - Modern, hızlı Python web framework
- **SQLAlchemy** - ORM ve veritabanı yönetimi
- **Pydantic** - Veri validasyonu ve serialization
- **Uvicorn** - ASGI server
- **SQLite** - Hafif veritabanı çözümü

### Frontend
- **React 18** - Modern UI library
- **Axios** - HTTP client
- **React Icons** - Icon kütüphanesi
- **React DatePicker** - Tarih seçici
- **React Toastify** - Bildirim sistemi
- **CSS3** - Modern styling

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline
- **Nginx** - Web server (production)

## 🚀 Hızlı Başlangıç

### Önkoşullar
- Docker ve Docker Compose
- Git
- PowerShell (Windows) veya Bash (Linux/Mac)

### 1. Repository'yi Klonlayın
```bash
git clone https://github.com/yourusername/task-tracker.git
cd task-tracker
```

### 2. Tek Komutla Çalıştırın
```powershell
# PowerShell (Windows)
.\deploy.ps1

# Bash (Linux/Mac)
./build-images.sh
```

### 3. Erişim
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📁 Proje Yapısı

```
task-tracker/
├── 📁 task-tracker-backend/          # FastAPI Backend
│   ├── 📁 app/
│   │   ├── main.py                   # Ana uygulama
│   │   ├── models.py                 # Veritabanı modelleri
│   │   ├── schemas.py                # Pydantic şemaları
│   │   └── database.py               # Veritabanı yapılandırması
│   ├── Dockerfile                    # Backend container
│   ├── requirements.txt              # Python bağımlılıkları
│   └── README.md                     # Backend dokümantasyonu
├── 📁 task-tracker-frontend/         # React Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/            # React bileşenleri
│   │   ├── App.js                    # Ana uygulama
│   │   └── index.css                 # Stil dosyaları
│   ├── Dockerfile                    # Frontend container
│   ├── package.json                  # Node.js bağımlılıkları
│   └── README.md                     # Frontend dokümantasyonu
├── 📁 task-tracker-devops/           # DevOps yapılandırması
│   ├── docker-compose.template.yml   # Container orchestration
│   └── README.md                     # DevOps dokümantasyonu
├── 📁 .github/workflows/             # CI/CD pipeline
│   ├── build-and-push.yml           # Build ve push workflow
│   └── deploy.yml                    # Deployment workflow
├── 📄 deploy.ps1                     # Ana deployment script
├── 📄 build-images.ps1               # Build script
├── 📄 DEPLOYMENT_GUIDE.md            # Detaylı deployment kılavuzu
└── 📄 README.md                      # Bu dosya
```

## 🔧 Deployment

### Manuel Deployment
```powershell
# Commit hash ile
$COMMIT_HASH = git rev-parse --short HEAD
.\deploy.ps1 -CommitHash $COMMIT_HASH

# Sadece build
.\deploy.ps1 -BuildOnly

# Sadece deploy
.\deploy.ps1 -DeployOnly
```

### GitHub Actions ile Otomatik Deployment
1. GitHub Secrets'e `DOCKER_PASSWORD` ekleyin
2. `main` branch'e push yapın
3. Actions sekmesinde ilerlemeyi izleyin

## 📚 API Dokümantasyonu

### Ana Endpoint'ler
- `GET /` - Ana sayfa
- `GET /health` - Sistem durumu
- `GET /tasks/` - Tüm görevleri listele
- `POST /tasks/` - Yeni görev oluştur
- `GET /tasks/{id}` - Tek görev getir
- `PUT /tasks/{id}` - Görev güncelle
- `PATCH /tasks/{id}/toggle` - Durum değiştir
- `DELETE /tasks/{id}` - Görev sil
- `GET /tasks/stats/summary` - İstatistikler

### Filtreleme Parametreleri
- `completed`: true/false
- `priority`: low/medium/high/urgent
- `category`: work/personal/shopping/health/education/other
- `search`: Başlık veya açıklamada arama
- `skip`: Pagination offset
- `limit`: Maksimum sonuç sayısı

### Örnek API Kullanımı
```javascript
// Yeni görev oluştur
const task = await fetch('/tasks/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Yeni Görev',
    description: 'Görev açıklaması',
    priority: 'high',
    category: 'work',
    due_date: '2024-12-31T23:59:59'
  })
});

// Görevleri filtrele
const tasks = await fetch('/tasks/?priority=high&completed=false');
```

## 🔨 Geliştirme

### Backend Geliştirme
```bash
cd task-tracker-backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Geliştirme
```bash
cd task-tracker-frontend
npm install
npm start
```

### Veritabanı Şeması
```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(1000),
    completed BOOLEAN DEFAULT FALSE,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    category ENUM('work', 'personal', 'shopping', 'health', 'education', 'other') DEFAULT 'other',
    due_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔄 CI/CD Pipeline

### Build Workflow (`build-and-push.yml`)
1. **Checkout**: Kodu çek
2. **Hash**: Commit hash'i al
3. **Build**: Docker imajları build et
4. **Push**: Docker Hub'a push et
5. **Artifact**: Deployment bilgilerini sakla

### Deploy Workflow (`deploy.yml`)
1. **Verify**: İmajların varlığını kontrol et
2. **Deploy**: Docker Compose ile deploy et
3. **Health Check**: Servislerin durumunu kontrol et
4. **Report**: Deployment raporu oluştur

### Versiyonlama Stratejisi
- Her commit için eşsiz hash (örn: `a1b2c3d`)
- Latest tag kullanılmaz
- Rollback için eski hash'ler kullanılabilir

## 🌐 Production Deployment

### Gereksinimler
- Docker ve Docker Compose
- En az 2GB RAM
- 10GB disk alanı

### Güvenlik
- CORS ayarları production için kısıtlanmış
- Environment variables ile yapılandırma
- Health check endpoint'leri

### Monitoring
```bash
# Container durumu
docker ps

# Logları izle
docker logs -f task-tracker-backend
docker logs -f task-tracker-frontend

# Sistem kaynakları
docker stats
```

## 🐛 Sorun Giderme

### Yaygın Sorunlar

#### Container Restart Ediyor
```bash
# Logları kontrol et
docker logs task-tracker-backend
docker logs task-tracker-frontend

# Port çakışması
docker-compose down
docker-compose up -d
```

#### API Erişim Sorunu
```bash
# Backend health check
curl http://localhost:8000/health

# CORS ayarlarını kontrol et
# main.py dosyasında allow_origins kısmını incele
```

#### Frontend Build Hatası
```bash
# Dependencies'i yeniden yükle
cd task-tracker-frontend
rm -rf node_modules package-lock.json
npm install
```

## 📈 Performans

### Backend
- SQLAlchemy ORM ile optimize edilmiş sorgular
- Pagination desteği
- Connection pooling
- Async/await desteği

### Frontend
- React 18 ile otomatik batching
- Lazy loading
- Optimized re-renders
- Gzip compression (production)

## 🔒 Güvenlik

### Backend Güvenlik
- Input validation (Pydantic)
- SQL injection koruması (SQLAlchemy ORM)
- CORS yapılandırması
- Error handling (sensitive data gizleme)

### Frontend Güvenlik
- XSS koruması
- CSRF token desteği hazır
- Secure headers (Nginx)
- Environment variables

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

### Kod Standartları
- Python: PEP 8
- JavaScript: ESLint
- Commit messages: Conventional Commits

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 👥 Katkıda Bulunanlar

- **Baki Akgun** - Initial work - [@BakiAkgun1](https://github.com/BakiAkgun1)

## 📞 İletişim

Proje Linki: [https://github.com/BakiAkgun1/task-tracker](https://github.com/BakiAkgun1/task-tracker)

---

## 🔥 Son Güncellemeler

### v2.0.0 (2024-12-19)
- ✅ Modern React frontend
- ✅ Gelişmiş FastAPI backend
- ✅ Docker containerization
- ✅ GitHub Actions CI/CD
- ✅ Commit hash versioning
- ✅ Kapsamlı dokümantasyon

### v1.0.0 (2024-12-18)
- ✅ İlk versiyon
- ✅ Temel CRUD işlemleri
- ✅ Basit UI

---

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**
