# 🚀 Task Tracker - GitOps ile Kubernetes Deployment

Modern bir task tracking uygulaması, GitOps prensipleri ile Kubernetes'te çalışır.

## 🎯 Özellikler

* ✅ **React Frontend** - Modern UI/UX
* ✅ **FastAPI Backend** - RESTful API
* ✅ **Docker Containerization** - Kolay deployment
* ✅ **Kubernetes Deployment** - Production ready
* ✅ **ArgoCD GitOps** - Otomatik deployment
* ✅ **GitHub Actions CI/CD** - Otomatik build & deploy
* ✅ **Helm Charts** - Kubernetes manifest yönetimi

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

### 1. Gereksinimler

* Docker Desktop (Kubernetes aktif)
* kubectl CLI
* PowerShell (Windows)

### 2. ArgoCD Kurulumu

```powershell
# Hızlı kurulum
.\quick-setup.ps1

# Veya manuel kurulum
.\argocd-install.ps1
```

### 3. GitHub Secrets Ekleme

1. GitHub Repository > Settings > Secrets
2. Şu secret'ları ekleyin:

   * `DOCKER_USERNAME`
   * `DOCKER_PASSWORD`
   * `ARGOCD_SERVER` (opsiyonel)
   * `ARGOCD_PASSWORD` (opsiyonel)

### 4. GitOps Test

```powershell
git add .
git commit -m "Test GitOps workflow"
git push origin main
```

## 📁 Proje Yapısı

```
task-tracker/
├── task-tracker-backend/
│   ├── app/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── README.md
├── task-tracker-frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
├── helm-chart/
├── argocd-apps/
├── .github/workflows/
├── argocd-install.ps1
├── quick-setup.ps1
├── GITHUB-SECRETS-SETUP.md
└── README.md
```

## 🔧 Deployment

### ArgoCD ile Otomatik Deployment

1. **ArgoCD UI:** `http://ARGOCD_IP`
2. **Kullanıcı:** `admin`
3. **Şifre:** `sO2HOgp5qkZpHYbW`
4. **Application'lar:**

   * `task-tracker-dev`
   * `task-tracker-prod`

### Manuel Deployment

```powershell
kubectl apply -f argocd-apps/task-tracker-dev.yaml
kubectl apply -f argocd-apps/task-tracker-prod.yaml
```

## 📚 API Dokümantasyonu

### Ana Endpoint'ler

* `GET /` - Ana sayfa
* `GET /health` - Sistem durumu
* `GET /tasks/` - Tüm görevler
* `POST /tasks/` - Yeni görev oluştur
* `GET /tasks/{id}` - Tek görev
* `PUT /tasks/{id}` - Görev güncelle
* `PATCH /tasks/{id}/toggle` - Durum değiştir
* `DELETE /tasks/{id}` - Görev sil
* `GET /tasks/stats/summary` - İstatistikler

### Filtreleme Parametreleri

* `completed`: true/false
* `priority`: low/medium/high/urgent
* `category`: work/personal/shopping/health/education/other
* `search`: Başlık veya açıklama
* `skip`: Pagination offset
* `limit`: Maksimum sonuç sayısı

## 🔄 GitOps Workflow

1. Code push:

```bash
git add .
git commit -m "Yeni özellik eklendi"
git push origin main
```

2. GitHub Actions:

* Docker image build & push
* Helm chart values.yaml güncelle
* Git commit

3. ArgoCD Sync:

* ArgoCD değişiklikleri algılar
* Kubernetes cluster güncellenir
* Pod'lar yeniden başlatılır

## 🐛 Sorun Giderme

* ArgoCD pod'ları çalışmıyorsa:

```powershell
kubectl describe pods -n argocd
kubectl logs -f deployment/argocd-server -n argocd
```

* Application sync hatası:

```powershell
.\argocd.exe app get task-tracker-dev
kubectl describe application task-tracker-dev -n argocd
```

* Image pull hatası:

  * Docker Hub credentials kontrolü
  * Image tag kontrolü
  * Network bağlantısı kontrolü

## 📈 Monitoring

* ArgoCD:

```powershell
.\argocd.exe app list
.\argocd.exe app get task-tracker-dev
```

* Kubernetes:

```powershell
kubectl get all -n task-tracker-dev
kubectl logs -f deployment/task-tracker-backend -n task-tracker-dev
```

* Manuel sync:

```powershell
.\argocd.exe app sync task-tracker-dev
```



## 📄 Lisans

MIT Lisansı



