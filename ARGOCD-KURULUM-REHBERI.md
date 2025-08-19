# 🚀 ArgoCD Kurulum ve GitOps Entegrasyon Rehberi

## 📋 1. KUBERNETES CLUSTER HAZIRLIĞI

### Docker Desktop ile Kubernetes Aktifleştirme:
1. Docker Desktop'ı aç
2. Settings > Kubernetes
3. "Enable Kubernetes" kutucuğunu işaretle
4. "Apply & Restart" butonuna tıkla
5. 2-3 dakika bekle

### Kontrol Komutları:
```powershell
kubectl cluster-info
kubectl get nodes
kubectl get namespaces
```

---

## 🛠 2. ARGOCD KURULUMU

### Namespace Oluştur:
```powershell
kubectl create namespace argocd
```

### ArgoCD Kurulumu:
```powershell
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

### Kurulum Durumunu Kontrol Et:
```powershell
kubectl get pods -n argocd
```
*Tüm pod'lar "Running" olana kadar bekle (2-3 dakika)*

### ArgoCD Server'ı Dış Erişime Aç:
```powershell
kubectl patch svc argocd-server -n argocd -p '{"spec":{"type":"LoadBalancer"}}'
```

### ArgoCD Admin Şifresini Al:
```powershell
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | ForEach-Object { [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($_)) }
```

### ArgoCD UI Erişim IP'sini Al:
```powershell
kubectl get svc argocd-server -n argocd
```

---

## 🔗 3. ARGOCD UI'YE ERİŞİM

1. Browser'da `http://EXTERNAL-IP` adresine git
2. Username: `admin`
3. Password: Yukarıda aldığın şifre
4. Login yap

---

## 📦 4. GITOPS REPO'YU ARGOCD'YE BAĞLAMA

### ArgoCD UI'de:
1. **Settings** > **Repositories** > **Connect Repo**
2. **Connection Method**: HTTPS
3. **Repository URL**: `https://github.com/BakiAkgun1/task-tracker-full.git`
4. **Connect** butonuna tıkla

### CLI ile (Alternatif):
```powershell
# ArgoCD CLI indir (Windows)
Invoke-WebRequest -Uri "https://github.com/argoproj/argo-cd/releases/latest/download/argocd-windows-amd64.exe" -OutFile "argocd.exe"

# ArgoCD'ye login
.\argocd.exe login <ARGOCD-SERVER-IP>

# Repository ekle
.\argocd.exe repo add https://github.com/BakiAkgun1/task-tracker-full.git
```

---

## 🎯 5. APPLICATION OLUŞTURMA

### Development Application (ArgoCD UI'de):
1. **Applications** > **New App**
2. **Application Name**: `task-tracker-dev`
3. **Project**: `default`
4. **Sync Policy**: `Automatic`
5. **Repository URL**: `https://github.com/BakiAkgun1/task-tracker-full.git`
6. **Revision**: `HEAD`
7. **Path**: `helm-chart`
8. **Cluster URL**: `https://kubernetes.default.svc`
9. **Namespace**: `task-tracker-dev`
10. **Values Files**: `values.yaml`
11. **Create** butonuna tıkla

### CLI ile Application Oluşturma:
```powershell
.\argocd.exe app create task-tracker-dev `
  --repo https://github.com/BakiAkgun1/task-tracker-full.git `
  --path helm-chart `
  --dest-server https://kubernetes.default.svc `
  --dest-namespace task-tracker-dev `
  --helm-set-file values=values.yaml `
  --sync-policy automated `
  --auto-prune `
  --self-heal
```

---

## ⚙️ 6. GITHUB ACTIONS ENTEGRASYONU

### GitHub Secrets Ekle:
1. GitHub repo'da **Settings** > **Secrets and variables** > **Actions**
2. **New repository secret** butonuna tıkla
3. Şu secret'ları ekle:
   - `DOCKER_USERNAME`: Docker Hub kullanıcı adın
   - `DOCKER_PASSWORD`: Docker Hub şifren

### Values.yaml Güncelleme GitHub Action:
```yaml
# .github/workflows/update-values.yml
name: Update Values and Deploy

on:
  push:
    branches: [ main, develop ]

jobs:
  build-and-update:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      with:
        token: ${{ secrets.GITHUB_TOKEN }}

    - name: Get commit hash
      id: commit
      run: echo "SHORT_SHA=$(git rev-parse --short HEAD)" >> $GITHUB_OUTPUT

    - name: Login to Docker Hub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and push backend
      uses: docker/build-push-action@v5
      with:
        context: ./task-tracker-backend
        push: true
        tags: bakiakgun/task-tracker-backend:${{ steps.commit.outputs.SHORT_SHA }}

    - name: Build and push frontend
      uses: docker/build-push-action@v5
      with:
        context: ./task-tracker-frontend
        push: true
        tags: bakiakgun/task-tracker-frontend:${{ steps.commit.outputs.SHORT_SHA }}

    - name: Update values.yaml
      run: |
        sed -i "s/tag: \".*\"/tag: \"${{ steps.commit.outputs.SHORT_SHA }}\"/g" helm-chart/values.yaml

    - name: Commit and push changes
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git add helm-chart/values.yaml
        git commit -m "Update image tags to ${{ steps.commit.outputs.SHORT_SHA }}"
        git push
```

---

## 🔄 7. GITOPS WORKFLOW TESTİ

### Test Adımları:
1. **Code değişikliği yap** (örnek: README.md'yi güncelle)
2. **Git commit ve push yap**:
   ```powershell
   git add .
   git commit -m "Test GitOps workflow"
   git push origin main
   ```
3. **GitHub Actions'ı izle** (GitHub > Actions sekmesi)
4. **ArgoCD UI'de sync durumunu kontrol et**
5. **Kubernetes pod'larını kontrol et**:
   ```powershell
   kubectl get pods -n task-tracker-dev
   ```

---

## 📊 8. MONITORING VE KONTROL

### ArgoCD Application Durumu:
```powershell
.\argocd.exe app list
.\argocd.exe app get task-tracker-dev
```

### Kubernetes Durumu:
```powershell
kubectl get all -n task-tracker-dev
kubectl logs -f deployment/task-tracker-backend -n task-tracker-dev
```

### Manuel Sync (Gerekirse):
```powershell
.\argocd.exe app sync task-tracker-dev
```

---

## 🎯 9. ÖĞRENME NOKTALARI

### GitOps Prensipleri:
- **Declarative**: Git'te desired state tanımı
- **Versioned**: Tüm değişiklikler Git history'de
- **Immutable**: Infrastructure as Code
- **Pull-based**: ArgoCD cluster'dan pull yapar

### ArgoCD Kavramları:
- **Application**: Deploy edilecek uygulamanın tanımı
- **Project**: Application'ları gruplandırma
- **Repository**: Git repo bağlantısı
- **Sync**: Git ile cluster arasında senkronizasyon

### Helm Kavramları:
- **Chart**: Kubernetes manifest template'leri
- **Values**: Konfigürasyon parametreleri
- **Templates**: Go template syntax ile parametrik manifest'ler

---

## 🚨 10. TROUBLESHOOTING

### ArgoCD Pod'ları Çalışmıyorsa:
```powershell
kubectl describe pods -n argocd
kubectl logs -f deployment/argocd-server -n argocd
```

### Application Sync Hatası:
```powershell
.\argocd.exe app get task-tracker-dev
kubectl describe application task-tracker-dev -n argocd
```

### Image Pull Hatası:
- Docker Hub credentials kontrolü
- Image tag'lerin doğru olup olmadığını kontrol et
- Network bağlantısını kontrol et

---

## ✅ BAŞARI KRİTERLERİ

1. ✅ ArgoCD UI'ye erişebiliyorsun
2. ✅ GitHub repo ArgoCD'ye bağlandı
3. ✅ Application oluşturuldu ve sync oldu
4. ✅ GitHub Actions çalışıyor ve values.yaml güncelliyor
5. ✅ Pod'lar çalışır durumda
6. ✅ Uygulama erişilebilir durumda

Bu adımları sırayla takip et ve her adımda sonucu kontrol et! 🎯
