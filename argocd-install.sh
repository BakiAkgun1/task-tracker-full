#!/bin/bash

# ArgoCD Namespace oluştur
kubectl create namespace argocd

# ArgoCD kurulumu
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# ArgoCD CLI kurulumu (Linux/macOS)
curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
rm argocd-linux-amd64

# ArgoCD Server'ı external access için expose et
kubectl patch svc argocd-server -n argocd -p '{"spec":{"type":"LoadBalancer"}}'

# ArgoCD admin şifresini al
echo "ArgoCD Admin Password:"
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
echo ""

echo "ArgoCD kurulumu tamamlandı!"
echo "ArgoCD UI'ye erişmek için LoadBalancer IP'sini kontrol edin:"
echo "kubectl get svc argocd-server -n argocd"
