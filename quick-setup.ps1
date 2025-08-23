# 🚀 Task Tracker - Hızlı ArgoCD Kurulum Script'i
# Kullanıcı: admin
# Şifre: sO2HOgp5qkZpHYbW

Write-Host "🎯 Task Tracker ArgoCD Hızlı Kurulum Başlıyor..." -ForegroundColor Green
Write-Host "Kullanıcı: admin" -ForegroundColor Cyan
Write-Host "Şifre: sO2HOgp5qkZpHYbW" -ForegroundColor Cyan

# 1. Kubernetes cluster kontrolü
Write-Host "`n🔍 Kubernetes cluster kontrol ediliyor..." -ForegroundColor Yellow
$clusterInfo = kubectl cluster-info 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Kubernetes cluster bulunamadı!" -ForegroundColor Red
    Write-Host "Docker Desktop'ta Kubernetes'i aktifleştirin." -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Kubernetes cluster hazır" -ForegroundColor Green

# 2. ArgoCD kurulumu
Write-Host "`n📦 ArgoCD kuruluyor..." -ForegroundColor Yellow
& .\argocd-install.ps1

# 3. ArgoCD IP'sini al
Write-Host "`n🌐 ArgoCD IP'si alınıyor..." -ForegroundColor Yellow
$argocdIP = kubectl get svc argocd-server -n argocd -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>$null

if (!$argocdIP) {
    Write-Host "❌ ArgoCD IP'si alınamadı. Manuel kontrol gerekli." -ForegroundColor Red
    kubectl get svc argocd-server -n argocd
    exit 1
}

# 4. Application'ları uygula
Write-Host "`n🎯 Application'lar uygulanıyor..." -ForegroundColor Yellow
kubectl apply -f argocd-apps/task-tracker-dev.yaml
kubectl apply -f argocd-apps/task-tracker-prod.yaml

# 5. Final bilgiler
Write-Host "`n🎉 Kurulum Tamamlandı!" -ForegroundColor Green
Write-Host "`n📋 Erişim Bilgileri:" -ForegroundColor Cyan
Write-Host "   ArgoCD URL: http://$argocdIP" -ForegroundColor White
Write-Host "   Kullanıcı: admin" -ForegroundColor White
Write-Host "   Şifre: sO2HOgp5qkZpHYbW" -ForegroundColor White

Write-Host "`n🔗 Application URL'leri:" -ForegroundColor Cyan
Write-Host "   Development: http://$argocdIP/applications/task-tracker-dev" -ForegroundColor White
Write-Host "   Production: http://$argocdIP/applications/task-tracker-prod" -ForegroundColor White

Write-Host "`n📚 Sonraki Adımlar:" -ForegroundColor Cyan
Write-Host "   1. GitHub Secrets ekleyin (GITHUB-SECRETS-SETUP.md)" -ForegroundColor White
Write-Host "   2. GitHub'a push yapın" -ForegroundColor White
Write-Host "   3. ArgoCD UI'de sync durumunu kontrol edin" -ForegroundColor White

Write-Host "`n🚀 GitOps workflow'unuz hazır!" -ForegroundColor Green
