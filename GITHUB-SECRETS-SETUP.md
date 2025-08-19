# 🔐 GitHub Secrets Kurulum Rehberi

## 📋 Gerekli Secret'lar

GitHub repo'nuzda şu secret'ları eklemeniz gerekiyor:

### 1. GitHub Repository'ye Git:
- `https://github.com/BakiAkgun1/task-tracker-full`
- **Settings** sekmesine tıkla
- Sol menüden **Secrets and variables** > **Actions** seçin

### 2. Şu Secret'ları Ekle:

#### `DOCKER_USERNAME`
- **Name**: `DOCKER_USERNAME`
- **Secret**: `bakiakgun` (Docker Hub kullanıcı adınız)

#### `DOCKER_PASSWORD`
- **Name**: `DOCKER_PASSWORD`
- **Secret**: Docker Hub şifreniz veya Access Token

## 🔧 Docker Hub Access Token Oluşturma (Önerilen)

Şifre yerine Access Token kullanmak daha güvenli:

1. **Docker Hub**'a git: https://hub.docker.com/
2. **Account Settings** > **Security**
3. **New Access Token** butonuna tıkla
4. **Access Token Description**: `GitHub Actions`
5. **Access permissions**: `Read, Write, Delete`
6. **Generate** butonuna tıkla
7. Token'ı kopyala ve GitHub Secret olarak ekle

## ✅ Secret'ların Doğru Olduğunu Kontrol Et

GitHub Actions'da şu hata alıyorsan secret'lar yanlış:
- `Error: buildx failed with: ERROR: failed to solve: failed to do request: Head "https://registry-1.docker.io/v2/bakiakgun/task-tracker-backend/blobs/...": unauthorized`

## 🎯 Test

Secret'ları ekledikten sonra:
1. Herhangi bir dosyayı değiştir (örn: README.md)
2. Git commit & push yap
3. GitHub Actions sekmesinde workflow'un çalıştığını kontrol et
4. Docker Hub'da yeni image'ların geldiğini kontrol et
