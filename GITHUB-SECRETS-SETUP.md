# 🔐 GitHub Secrets Kurulum Rehberi

Bu rehber, Task Tracker projesinin GitHub Actions ile ArgoCD entegrasyonu için gerekli secret'ları nasıl kuracağınızı açıklar.

## 📋 Gerekli Secret'lar

### 1. Docker Hub Credentials
- **DOCKER_USERNAME**: Docker Hub kullanıcı adınız
- **DOCKER_PASSWORD**: Docker Hub şifreniz

### 2. ArgoCD Credentials (Opsiyonel)
- **ARGOCD_SERVER**: ArgoCD server IP adresi
- **ARGOCD_PASSWORD**: ArgoCD admin şifresi (`sO2HOgp5qkZpHYbW`)

## 🛠️ Kurulum Adımları

### 1. GitHub Repository'ye Git
1. [GitHub](https://github.com/BakiAkgun1/task-tracker-full) adresine gidin
2. Repository'nizi açın

### 2. Settings Sekmesine Git
1. Repository sayfasında **Settings** sekmesine tıklayın
2. Sol menüden **Secrets and variables** > **Actions** seçin

### 3. Secret'ları Ekleyin

#### Docker Hub Secret'ları:
1. **New repository secret** butonuna tıklayın
2. **Name**: `DOCKER_USERNAME`
3. **Value**: Docker Hub kullanıcı adınız
4. **Add secret** butonuna tıklayın

5. Tekrar **New repository secret** butonuna tıklayın
6. **Name**: `DOCKER_PASSWORD`
7. **Value**: Docker Hub şifreniz
8. **Add secret** butonuna tıklayın

#### ArgoCD Secret'ları (Opsiyonel):
1. **New repository secret** butonuna tıklayın
2. **Name**: `ARGOCD_SERVER`
3. **Value**: ArgoCD server IP adresi (örn: `192.168.1.100`)
4. **Add secret** butonuna tıklayın

5. Tekrar **New repository secret** butonuna tıklayın
6. **Name**: `ARGOCD_PASSWORD`
7. **Value**: `sO2HOgp5qkZpHYbW`
8. **Add secret** butonuna tıklayın

## 🔍 Secret'ları Kontrol Etme

### Mevcut Secret'ları Görme:
1. Settings > Secrets and variables > Actions
2. Repository secrets bölümünde tüm secret'ları görebilirsiniz

### Secret'ların Doğru Olduğunu Test Etme:
```powershell
# Docker Hub test
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

# ArgoCD test (eğer CLI kuruluysa)
.\argocd.exe login $ARGOCD_SERVER --username admin --password $ARGOCD_PASSWORD --insecure
```

## 🚨 Güvenlik Notları

### Secret Güvenliği:
- ✅ Secret'lar GitHub'da şifrelenmiş olarak saklanır
- ✅ GitHub Actions'da sadece gerekli job'larda kullanılır
- ✅ Log'larda secret değerleri görünmez

### Best Practices:
- 🔒 Güçlü şifreler kullanın
- 🔄 Şifreleri düzenli olarak değiştirin
- 👥 Sadece gerekli kişilere erişim verin
- 📝 Secret kullanımını dokümante edin

## 🧪 Test Etme

### 1. GitHub Actions Test:
1. Repository'de herhangi bir dosyayı düzenleyin
2. Commit ve push yapın
3. **Actions** sekmesinde workflow'un çalıştığını kontrol edin

### 2. Docker Hub Test:
1. Actions log'larında Docker Hub login'inin başarılı olduğunu kontrol edin
2. Docker Hub'da yeni image'ların oluştuğunu kontrol edin

### 3. ArgoCD Test:
1. ArgoCD UI'de application'ların sync olduğunu kontrol edin
2. Pod'ların çalıştığını kontrol edin

## 🔧 Sorun Giderme

### Docker Hub Login Hatası:
```bash
# Docker Hub credentials'ları kontrol edin
docker login -u YOUR_USERNAME -p YOUR_PASSWORD
```

### ArgoCD Connection Hatası:
```bash
# ArgoCD server'ın çalıştığını kontrol edin
kubectl get svc argocd-server -n argocd

# ArgoCD CLI ile test edin
.\argocd.exe login YOUR_SERVER_IP --username admin --password YOUR_PASSWORD --insecure
```

### GitHub Actions Hatası:
1. Actions log'larını kontrol edin
2. Secret isimlerinin doğru olduğunu kontrol edin
3. Secret değerlerinin doğru olduğunu kontrol edin

## 📞 Destek

Eğer sorun yaşıyorsanız:
1. GitHub Actions log'larını kontrol edin
2. ArgoCD pod log'larını kontrol edin
3. Docker Hub repository'nizi kontrol edin

---

**✅ Tüm secret'lar eklendikten sonra GitOps workflow'unuz hazır olacak!**
