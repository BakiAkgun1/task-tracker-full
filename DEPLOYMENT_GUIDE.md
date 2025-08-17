# Task Tracker v2.0 - Deployment Guide

Bu kılavuz, gelişmiş Task Tracker uygulamasını Git commit hash'i ile versiyonlayarak nasıl deploy edeceğinizi gösterir.

## 🆕 Yeni Özellikler v2.0

### Backend:
- ✅ Gelişmiş validasyon ve hata yönetimi
- ✅ Logging sistemi
- ✅ Öncelik seviyeleri (Düşük, Orta, Yüksek, Acil)
- ✅ Kategoriler (İş, Kişisel, Alışveriş, Sağlık, Eğitim, Diğer)
- ✅ Bitiş tarihi desteği
- ✅ Gelişmiş filtreleme ve arama
- ✅ İstatistik endpoint'i
- ✅ Sağlık kontrolü endpoint'i
- ✅ API dokümantasyonu (Swagger)

### Frontend:
- ✅ Modern ve responsive tasarım
- ✅ Öncelik ve kategori filtreleme
- ✅ Arama özelliği
- ✅ Bitiş tarihi seçici
- ✅ İstatistik dashboard'u
- ✅ Toast bildirimleri
- ✅ Modal düzenleme
- ✅ Production-ready Nginx konfigürasyonu

## 🚀 Hızlı Başlangıç

### 1. Tek Komutla Deploy
```powershell
.\deploy.ps1
```

### 2. Sadece Build
```powershell
.\deploy.ps1 -BuildOnly
```

### 3. Sadece Deploy (imajlar hazırsa)
```powershell
.\deploy.ps1 -DeployOnly
```

### 4. Belirli bir commit hash ile
```powershell
.\deploy.ps1 -CommitHash "835e68f"
```

## 📋 Manuel Adımlar

### Build İşlemi
```powershell
# PowerShell script ile
.\build-images.ps1

# Veya manuel olarak
$COMMIT_HASH = git rev-parse --short HEAD
docker build -t bakiakgun/task-tracker-backend:$COMMIT_HASH ./task-tracker-backend
docker build -t bakiakgun/task-tracker-frontend:$COMMIT_HASH ./task-tracker-frontend
```

### Docker Hub'a Push
```powershell
docker push bakiakgun/task-tracker-backend:$COMMIT_HASH
docker push bakiakgun/task-tracker-frontend:$COMMIT_HASH
```

### ⚠️ Önemli Not
Bu sistem **sadece commit hash versiyonu** kullanır. `latest` tag'i kullanılmaz, böylece:
- Hangi versiyonun çalıştığı her zaman belli olur
- Karışıklık önlenir
- Rollback işlemleri daha güvenli olur

### Deploy
```powershell
cd task-tracker-devops
$env:COMMIT_HASH = "835e68f"  # Örnek commit hash
docker-compose -f docker-compose.template.yml up -d
```

## 🔧 Dosya Açıklamaları

- **`deploy.ps1`**: Ana deployment script'i
- **`build-images.ps1`**: Sadece imaj build script'i  
- **`docker-compose.template.yml`**: Environment variable kullanan template
- **`.github/workflows/build-and-push.yml`**: GitHub Actions workflow

## 🌐 Erişim Adresleri

Deploy sonrası:
- **Frontend**: http://localhost (Port 80)
- **Backend API**: http://localhost:8000
- **API Dokümantasyonu**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📊 Kontrol Komutları

```powershell
# Container durumunu kontrol et
docker-compose -f task-tracker-devops/docker-compose.template.yml ps

# Logları kontrol et
docker-compose -f task-tracker-devops/docker-compose.template.yml logs

# Durdur
docker-compose -f task-tracker-devops/docker-compose.template.yml down
```

## 🔄 GitHub Actions

GitHub'a push yaptığınızda otomatik olarak:
1. Commit hash alınır
2. İmajlar build edilir
3. Docker Hub'a push edilir

Gereksinimler:
- GitHub Secrets'te `DOCKER_PASSWORD` tanımlı olmalı

## 💡 İpuçları

1. **Commit hash formatı**: 7 karakterlik kısa hash kullanılır (örn: `835e68f`)
2. **Sadece commit hash**: `latest` tag'i kullanılmaz, karışıklığı önler
3. **Rollback**: Eski bir commit hash'i ile deploy edebilirsiniz
4. **Environment**: `COMMIT_HASH` environment variable'ı ile kontrol edilir
5. **Versiyon takibi**: Her imaj sadece commit hash'i ile etiketlenir

## 🐛 Sorun Giderme

### İmaj bulunamadı hatası
```powershell
# İmajın Docker Hub'da olduğunu kontrol edin
docker pull bakiakgun/task-tracker-backend:835e68f
```

### Port çakışması
```powershell
# Mevcut containerları durdurun
docker-compose -f task-tracker-devops/docker-compose.template.yml down
```

### Git hatası
```powershell
# Git repository'de olduğunuzdan emin olun
git status
```
