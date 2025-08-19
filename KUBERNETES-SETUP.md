# 🚀 Kubernetes Kurulum Rehberi

## 📋 Seçenek 1: Docker Desktop ile Kubernetes (Önerilen)

### Adımlar:
1. **Docker Desktop**'ı açın
2. Sağ üstteki **⚙️ Settings** ikonuna tıklayın
3. Sol menüden **Kubernetes** sekmesini seçin
4. **☑️ Enable Kubernetes** kutucuğunu işaretleyin
5. **Apply & Restart** butonuna tıklayın
6. Docker Desktop yeniden başlatılacak (2-3 dakika sürer)

### Kurulum Doğrulama:
```powershell
# Kubernetes cluster durumu
kubectl cluster-info

# Node durumu
kubectl get nodes

# Namespace'ler
kubectl get namespaces
```

## 📋 Seçenek 2: Minikube Kurulumu

### Minikube İndirme:
```powershell
# Chocolatey ile (Chocolatey kurulu ise)
choco install minikube

# Veya manuel indirme
Invoke-WebRequest -Uri "https://storage.googleapis.com/minikube/releases/latest/minikube-windows-amd64.exe" -OutFile "minikube.exe"
Move-Item .\minikube.exe C:\Windows\System32\minikube.exe
```

### Minikube Başlatma:
```powershell
# Minikube başlat
minikube start

# Dashboard açma
minikube dashboard

# Durumu kontrol
minikube status
```

## 🎯 Hangi Seçeneği Tercih Etmelisiniz?

| Özellik | Docker Desktop | Minikube |
|---------|----------------|----------|
| **Kurulum** | Çok Kolay ✅ | Orta |
| **Kaynak Kullanımı** | Düşük ✅ | Orta |
| **Production Benzeri** | Orta | Yüksek ✅ |
| **ArgoCD Uyumluluğu** | Mükemmel ✅ | Mükemmel ✅ |

**Öneri**: Docker Desktop zaten kurulu olduğu için bu seçeneği öneririm.

---

## ⚡ Hızlı Başlangıç

1. Docker Desktop'ta Kubernetes'i aktifleştirin
2. Terminal'de şu komutu çalıştırın:
```powershell
kubectl cluster-info
```
3. Başarılı sonuç aldıysanız bir sonraki adıma geçin! 🎉
