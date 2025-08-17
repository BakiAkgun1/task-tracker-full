# Git commit hash'ini al (kısa versiyon - 7 karakter)
$COMMIT_HASH = git rev-parse --short HEAD

# Docker Hub kullanıcı adınız
$DOCKER_USER = "bakiakgun"

# İmaj isimleri
$BACKEND_IMAGE = "$DOCKER_USER/task-tracker-backend"
$FRONTEND_IMAGE = "$DOCKER_USER/task-tracker-frontend"

Write-Host "Building images with commit hash: $COMMIT_HASH" -ForegroundColor Green

# Backend imajını build et
Write-Host "Building backend image..." -ForegroundColor Yellow
Set-Location task-tracker-backend
docker build -t "${BACKEND_IMAGE}:${COMMIT_HASH}" .
Set-Location ..

# Frontend imajını build et
Write-Host "Building frontend image..." -ForegroundColor Yellow
Set-Location task-tracker-frontend
docker build -t "${FRONTEND_IMAGE}:${COMMIT_HASH}" .
Set-Location ..

Write-Host "Images built successfully!" -ForegroundColor Green
Write-Host "Backend: ${BACKEND_IMAGE}:${COMMIT_HASH}" -ForegroundColor Cyan
Write-Host "Frontend: ${FRONTEND_IMAGE}:${COMMIT_HASH}" -ForegroundColor Cyan

# Docker Hub'a push et (isteğe bağlı)
$push = Read-Host "Docker Hub'a push etmek istiyor musunuz? (y/n)"
if ($push -eq "y" -or $push -eq "Y") {
    Write-Host "Pushing images to Docker Hub..." -ForegroundColor Yellow
    docker push "${BACKEND_IMAGE}:${COMMIT_HASH}"
    docker push "${FRONTEND_IMAGE}:${COMMIT_HASH}"
    Write-Host "Images pushed successfully!" -ForegroundColor Green
}
