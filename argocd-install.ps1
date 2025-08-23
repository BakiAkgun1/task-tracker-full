# ArgoCD Kurulum ve Konfigürasyon Script'i
# Kullanıcı: admin
# Şifre: sO2HOgp5qkZpHYbW

Write-Host "🚀 ArgoCD Kurulum ve Konfigürasyon Başlıyor..." -ForegroundColor Green

# 1. Namespace oluştur
Write-Host "📦 ArgoCD namespace oluşturuluyor..." -ForegroundColor Yellow
kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -

# 2. ArgoCD kurulumu
Write-Host "🔧 ArgoCD kuruluyor..." -ForegroundColor Yellow
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# 3. Pod'ların hazır olmasını bekle
Write-Host "⏳ Pod'ların hazır olması bekleniyor..." -ForegroundColor Yellow
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=argocd-server -n argocd --timeout=300s

# 4. ArgoCD Server'ı LoadBalancer yap
Write-Host "🌐 ArgoCD Server LoadBalancer olarak ayarlanıyor..." -ForegroundColor Yellow
kubectl patch svc argocd-server -n argocd -p '{"spec":{"type":"LoadBalancer"}}'

# 5. Admin şifresini güncelle
Write-Host "🔐 Admin şifresi güncelleniyor..." -ForegroundColor Yellow
$password = "sO2HOgp5qkZpHYbW"
$encodedPassword = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($password))

kubectl patch secret argocd-secret -n argocd -p "{\"data\":{\"admin.password\":\"$encodedPassword\"}}"

# 6. ArgoCD CLI indir (Windows için)
Write-Host "📥 ArgoCD CLI indiriliyor..." -ForegroundColor Yellow
if (!(Test-Path "argocd.exe")) {
    Invoke-WebRequest -Uri "https://github.com/argoproj/argo-cd/releases/latest/download/argocd-windows-amd64.exe" -OutFile "argocd.exe"
}

# 7. ArgoCD Server IP'sini al
Write-Host "🔍 ArgoCD Server IP'si alınıyor..." -ForegroundColor Yellow
$maxAttempts = 30
$attempt = 0

do {
    $attempt++
    Write-Host "Deneme $attempt/$maxAttempts..." -ForegroundColor Gray
    Start-Sleep -Seconds 10
    
    $service = kubectl get svc argocd-server -n argocd -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>$null
    if ($service) {
        Write-Host "✅ ArgoCD Server IP: $service" -ForegroundColor Green
        break
    }
} while ($attempt -lt $maxAttempts)

if (!$service) {
    Write-Host "❌ ArgoCD Server IP alınamadı. Manuel kontrol gerekli." -ForegroundColor Red
    kubectl get svc argocd-server -n argocd
    exit 1
}

# 8. ArgoCD'ye login ol
Write-Host "🔑 ArgoCD'ye login olunuyor..." -ForegroundColor Yellow
$loginResult = .\argocd.exe login $service --username admin --password $password --insecure 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ ArgoCD'ye başarıyla login olundu!" -ForegroundColor Green
} else {
    Write-Host "❌ Login başarısız: $loginResult" -ForegroundColor Red
}

# 9. Repository ekle
Write-Host "📚 Repository ekleniyor..." -ForegroundColor Yellow
$repoResult = .\argocd.exe repo add https://github.com/BakiAkgun1/task-tracker-full.git --username admin --password $password --insecure 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Repository başarıyla eklendi!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Repository eklenemedi (zaten mevcut olabilir): $repoResult" -ForegroundColor Yellow
}

# 10. Application'ları oluştur
Write-Host "🎯 Application'lar oluşturuluyor..." -ForegroundColor Yellow

# Development Application
$devAppResult = .\argocd.exe app create task-tracker-dev `
  --repo https://github.com/BakiAkgun1/task-tracker-full.git `
  --path helm-chart `
  --dest-server https://kubernetes.default.svc `
  --dest-namespace task-tracker-dev `
  --sync-policy automated `
  --auto-prune `
  --self-heal `
  --insecure 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Development application oluşturuldu!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Development application oluşturulamadı (zaten mevcut olabilir): $devAppResult" -ForegroundColor Yellow
}

# Production Application
$prodAppResult = .\argocd.exe app create task-tracker-prod `
  --repo https://github.com/BakiAkgun1/task-tracker-full.git `
  --path helm-chart `
  --dest-server https://kubernetes.default.svc `
  --dest-namespace task-tracker-prod `
  --sync-policy automated `
  --auto-prune `
  --self-heal `
  --insecure 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Production application oluşturuldu!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Production application oluşturulamadı (zaten mevcut olabilir): $prodAppResult" -ForegroundColor Yellow
}

# 11. Final bilgiler
Write-Host "`n🎉 ArgoCD Kurulum Tamamlandı!" -ForegroundColor Green
Write-Host "`n📋 Erişim Bilgileri:" -ForegroundColor Cyan
Write-Host "   URL: http://$service" -ForegroundColor White
Write-Host "   Kullanıcı: admin" -ForegroundColor White
Write-Host "   Şifre: $password" -ForegroundColor White

Write-Host "`n🔗 Uygulama URL'leri:" -ForegroundColor Cyan
Write-Host "   Development: http://$service/applications/task-tracker-dev" -ForegroundColor White
Write-Host "   Production: http://$service/applications/task-tracker-prod" -ForegroundColor White

Write-Host "`n📚 Komutlar:" -ForegroundColor Cyan
Write-Host "   Application listesi: .\argocd.exe app list" -ForegroundColor White
Write-Host "   Development sync: .\argocd.exe app sync task-tracker-dev" -ForegroundColor White
Write-Host "   Production sync: .\argocd.exe app sync task-tracker-prod" -ForegroundColor White

Write-Host "`n🚀 Sonraki adım: GitHub'a push yaparak GitOps workflow'unu test edin!" -ForegroundColor Green
