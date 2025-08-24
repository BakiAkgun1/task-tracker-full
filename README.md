# 🚀 Task Tracker - GitOps ile Kubernetes Deployment

Modern bir task tracking uygulaması, GitOps prensipleri ile Kubernetes'te çalışır.

## 🎯 Özellikler

- ✅ **React Frontend** - Modern UI/UX
- ✅ **FastAPI Backend** - RESTful API
- ✅ **Docker Containerization** - Kolay deployment
- ✅ **Kubernetes Deployment** - Production ready
- ✅ **ArgoCD GitOps** - Otomatik deployment
- ✅ **GitHub Actions CI/CD** - Otomatik build & deploy
- ✅ **Helm Charts** - Kubernetes manifest yönetimi

## 🏗️ Mimari

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Repo   │───▶│  GitHub Actions │───▶│   Docker Hub    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ArgoCD GitOps │◀───│  Kubernetes     │◀───│   Helm Charts   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Hızlı Başlangıç

### 1. Prerequisites
- Docker Desktop (Kubernetes aktif)
- kubectl CLI
- PowerShell (Windows)

### 2. ArgoCD Kurulumu
```powershell
# Hızlı kurulum
.\quick-setup.ps1

# Veya manuel kurulum
.\argocd-install.ps1
```

### 3. GitHub Secrets Ekleme
1. [GitHub Repository](https://github.com/BakiAkgun1/task-tracker-full) Settings > Secrets
2. Şu secret'ları ekleyin:
   - `DOCKER_USERNAME`: Docker Hub kullanıcı adı
   - `DOCKER_PASSWORD`: Docker Hub şifresi
   - `ARGOCD_SERVER`: ArgoCD server IP (opsiyonel)
   - `ARGOCD_PASSWORD`: `sO2HOgp5qkZpHYbW` (opsiyonel)

### 4. GitOps Test
```powershell
# Herhangi bir dosyayı değiştir ve push yap
git add .
git commit -m "Test GitOps workflow"
git push origin main
```

## 📁 Proje Yapısı

```
task-tracker/
├── 📁 task-tracker-backend/     # FastAPI Backend
│   ├── app/
│   │   ├── main.py             # Ana uygulama
│   │   ├── models.py           # Veritabanı modelleri
│   │   ├── schemas.py          # Pydantic şemaları
│   │   └── database.py         # Veritabanı yapılandırması
│   ├── Dockerfile              # Backend container
│   ├── requirements.txt        # Python bağımlılıkları
│   └── README.md               # Backend dokümantasyonu
├── 📁 task-tracker-frontend/   # React Frontend
│   ├── src/
│   │   ├── components/         # React bileşenleri
│   │   ├── App.js             # Ana uygulama
│   │   └── index.css          # Stil dosyaları
│   ├── Dockerfile             # Frontend container
│   ├── package.json           # Node.js bağımlılıkları
│   └── README.md              # Frontend dokümantasyonu
├── 📁 helm-chart/             # Kubernetes Helm Chart
│   ├── templates/             # Kubernetes manifest'leri
│   ├── values.yaml            # Konfigürasyon
│   └── Chart.yaml             # Chart metadata
├── 📁 argocd-apps/            # ArgoCD Application'ları
│   ├── task-tracker-dev.yaml  # Development environment
│   └── task-tracker-prod.yaml # Production environment
├── 📁 .github/workflows/      # CI/CD Pipeline
│   ├── gitops-update.yml      # GitOps workflow
│   └── build-and-push.yml     # Build workflow
├── 📄 argocd-install.ps1      # ArgoCD kurulum script'i
├── 📄 quick-setup.ps1         # Hızlı kurulum script'i
├── 📄 GITHUB-SECRETS-SETUP.md # GitHub Secrets rehberi
└── 📄 README.md               # Bu dosya
```

## 🔧 Deployment

### ArgoCD ile Otomatik Deployment
1. **ArgoCD UI'ye erişim**: `http://ARGOCD_IP`
2. **Kullanıcı**: `admin`
3. **Şifre**: `sO2HOgp5qkZpHYbW`
4. **Application'lar**:
   - `task-tracker-dev`: Development environment
   - `task-tracker-prod`: Production environment

### Manuel Deployment
```powershell
# Development
kubectl apply -f argocd-apps/task-tracker-dev.yaml

# Production
kubectl apply -f argocd-apps/task-tracker-prod.yaml
```

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

## 🔄 GitOps Workflow

### 1. Code Push
```bash
git add .
git commit -m "Yeni özellik eklendi"
git push origin main
```

### 2. GitHub Actions
- Docker image'ları build edilir
- Docker Hub'a push edilir
- Helm chart values.yaml güncellenir
- Git'e commit edilir

### 3. ArgoCD Sync
- ArgoCD değişiklikleri algılar
- Kubernetes cluster'ı günceller
- Pod'ları yeniden başlatır

## 🐛 Sorun Giderme

### ArgoCD Pod'ları Çalışmıyorsa
```powershell
kubectl describe pods -n argocd
kubectl logs -f deployment/argocd-server -n argocd
```

### Application Sync Hatası
```powershell
.\argocd.exe app get task-tracker-dev
kubectl describe application task-tracker-dev -n argocd
```

### Image Pull Hatası
- Docker Hub credentials kontrolü
- Image tag'lerin doğru olup olmadığını kontrol et
- Network bağlantısını kontrol et

## 📈 Monitoring

### ArgoCD Application Durumu
```powershell
.\argocd.exe app list
.\argocd.exe app get task-tracker-dev
```

### Kubernetes Durumu
```powershell
kubectl get all -n task-tracker-dev
kubectl logs -f deployment/task-tracker-backend -n task-tracker-dev
```

### Manuel Sync (Gerekirse)
```powershell
.\argocd.exe app sync task-tracker-dev
```

## 🎯 Öğrenme Noktaları

### GitOps Prensipleri
- **Declarative**: Git'te desired state tanımı
- **Versioned**: Tüm değişiklikler Git history'de
- **Immutable**: Infrastructure as Code
- **Pull-based**: ArgoCD cluster'dan pull yapar

### ArgoCD Kavramları
- **Application**: Deploy edilecek uygulamanın tanımı
- **Project**: Application'ları gruplandırma
- **Repository**: Git repo bağlantısı
- **Sync**: Git ile cluster arasında senkronizasyon

### Helm Kavramları
- **Chart**: Kubernetes manifest template'leri
- **Values**: Konfigürasyon parametreleri
- **Templates**: Go template syntax ile parametrik manifest'ler

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

Bu proje MIT lisansı altında lisanslanmıştır.

## 👥 Katkıda Bulunanlar

- **Baki Akgün** - Initial work - [@BakiAkgun1](https://github.com/BakiAkgun1)

## 📞 İletişim

Proje Linki: [https://github.com/BakiAkgun1/task-tracker-full](https://github.com/BakiAkgun1/task-tracker-full)

---

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**# Test GitOps
# GitOps Test
#   G i t O p s   T e s t  
 