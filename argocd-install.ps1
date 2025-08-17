# PowerShell ArgoCD Kurulum Scripti

Write-Host "ArgoCD Kurulumu Başlıyor..." -ForegroundColor Green

# ArgoCD Namespace oluştur
kubectl create namespace argocd

# ArgoCD kurulumu
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# ArgoCD CLI kurulumu (Windows)
Write-Host "ArgoCD CLI'yi indiriyorum..." -ForegroundColor Yellow
Invoke-WebRequest -Uri "https://github.com/argoproj/argo-cd/releases/latest/download/argocd-windows-amd64.exe" -OutFile "argocd.exe"
Write-Host "argocd.exe dosyasını PATH'inize ekleyin!" -ForegroundColor Yellow

# ArgoCD Server'ı external access için expose et
kubectl patch svc argocd-server -n argocd -p '{\"spec\":{\"type\":\"LoadBalancer\"}}'

# ArgoCD admin şifresini al
Write-Host "ArgoCD Admin Password:" -ForegroundColor Cyan
$password = kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}"
$decodedPassword = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($password))
Write-Host $decodedPassword -ForegroundColor White

Write-Host "ArgoCD kurulumu tamamlandı!" -ForegroundColor Green
Write-Host "ArgoCD UI'ye erişmek için LoadBalancer IP'sini kontrol edin:" -ForegroundColor Yellow
Write-Host "kubectl get svc argocd-server -n argocd" -ForegroundColor White
