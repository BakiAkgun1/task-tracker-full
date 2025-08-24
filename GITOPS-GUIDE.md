# 🚀 GitOps + ArgoCD Deployment Guide

Bu kılavuz Task Tracker uygulamasını GitOps metodolojisi ile ArgoCD kullanarak Kubernetes'e deploy etmenizi sağlar.

## 📋 Önkoşullar

- Kubernetes cluster (minikube, kind, EKS, GKE, AKS)
- kubectl CLI
- Docker Hub hesabı
- GitHub repository access

## 🛠 1. ArgoCD Kurulumu
h
### Linux/macOS:
```bash
chmod +x argocd-install.sh
./argocd-install.sh
```

### Windows:
```powershell
.\argocd-install.ps1
```

## 🔐 2. ArgoCD UI'ye Erişim

1. LoadBalancer IP'sini alın:
```bash
kubectl get svc argocd-server -n argocd
```

2. ArgoCD UI'ye browser'dan erişin:
   - Username: `admin`
   - Password: Script çalıştırdığınızda gösterilen şifre

## 🚀 3. Applications Deploy Etme

### Development Environment:
```bash
kubectl apply -f argocd-apps/task-tracker-dev.yaml
```

### Production Environment:
```bash
kubectl apply -f argocd-apps/task-tracker-prod.yaml
```

## 📊 4. Klasör Yapısı

```
k8s/
├── base/                          # Base Kubernetes manifests
│   ├── backend-deployment.yaml    # Backend deployment & service
│   ├── frontend-deployment.yaml   # Frontend deployment & service
│   ├── ingress.yaml               # Ingress configuration
│   └── kustomization.yaml         # Base kustomization
├── overlays/
│   ├── dev/                       # Development environment
│   │   ├── kustomization.yaml
│   │   ├── replica-patch.yaml     # 1 replica for dev
│   │   └── image-patch.yaml       # Latest images for dev
│   └── prod/                      # Production environment
│       ├── kustomization.yaml
│       ├── replica-patch.yaml     # 3 replicas for prod
│       └── resource-patch.yaml    # Higher resources for prod
```

## 🔄 5. GitOps Workflow

### Otomatik Sync (Development):
1. Code değişikliği yap
2. `develop` branch'e push et
3. GitHub Actions otomatik build/push yapar
4. ArgoCD otomatik sync yapar

### Manuel Sync (Production):
1. Code değişikliği yap
2. `main` branch'e push et
3. GitHub Actions build/push yapar
4. ArgoCD UI'den manuel sync yap

## 🎯 6. Monitoring ve Troubleshooting

### ArgoCD Application Status:
```bash
kubectl get applications -n argocd
```

### Application Logs:
```bash
kubectl logs -f deployment/task-tracker-backend -n task-tracker-dev
kubectl logs -f deployment/task-tracker-frontend -n task-tracker-dev
```

### Application Sync:
```bash
# CLI ile sync
argocd app sync task-tracker-dev
argocd app sync task-tracker-prod

# Veya ArgoCD UI'den sync butonu
```

## 🔧 7. Kustomize ile Local Test

```bash
# Dev environment test
kubectl kustomize k8s/overlays/dev

# Prod environment test
kubectl kustomize k8s/overlays/prod
```

## 🌐 8. External Access

### LoadBalancer ile:
```bash
kubectl get svc task-tracker-frontend-service -n task-tracker-dev
```

### Ingress ile:
1. Ingress controller kurulumu (nginx-ingress)
2. `k8s/base/ingress.yaml`'daki domain'i değiştir
3. DNS record'u ekle

## 🔄 9. Image Update Stratejisi

### Development:
- Otomatik sync aktif
- `latest` tag kullanır
- Her push'da otomatik deploy

### Production:
- Manuel sync
- Commit hash tag kullanır
- Manuel onay gerekir

## 🎛 10. ArgoCD CLI Komutları

```bash
# Login
argocd login <ARGOCD_SERVER>

# Application listesi
argocd app list

# Application detayları
argocd app get task-tracker-dev

# Sync
argocd app sync task-tracker-dev

# Logs
argocd app logs task-tracker-dev

# Delete
argocd app delete task-tracker-dev
```

## 🚨 11. Troubleshooting

### Common Issues:

1. **Image Pull Errors**: Docker Hub credentials kontrolü
2. **Sync Errors**: Repository access kontrolü
3. **Resource Errors**: Namespace ve RBAC kontrolü
4. **Network Errors**: Service ve Ingress konfigürasyon kontrolü

### Debug Commands:
```bash
# ArgoCD Application events
kubectl describe application task-tracker-dev -n argocd

# Pod status
kubectl get pods -n task-tracker-dev

# Service endpoints
kubectl get endpoints -n task-tracker-dev
```

## 🎯 GitOps Benefits

✅ **Declarative**: Git repository'de desired state tanımı
✅ **Automated**: Otomatik sync ve deployment
✅ **Auditable**: Tüm değişiklikler Git history'de
✅ **Rollback**: Git revert ile kolay rollback
✅ **Security**: Pull-based deployment model
✅ **Consistency**: Environment'lar arası tutarlılık
