# Deployment Script - Commit hash ile versiyonlama
param(
    [switch]$BuildOnly,
    [switch]$DeployOnly,
    [string]$CommitHash = ""
)

# Commit hash'ini belirle
if ($CommitHash -eq "") {
    $COMMIT_HASH = git rev-parse --short HEAD
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Git repository bulunamadı!" -ForegroundColor Red
        exit 1
    }
} else {
    $COMMIT_HASH = $CommitHash
}

$DOCKER_USER = "bakiakgun"
$BACKEND_IMAGE = "$DOCKER_USER/task-tracker-backend"
$FRONTEND_IMAGE = "$DOCKER_USER/task-tracker-frontend"

Write-Host "=== Task Tracker Deployment ===" -ForegroundColor Cyan
Write-Host "Commit Hash: $COMMIT_HASH" -ForegroundColor Green
Write-Host "Backend Image: ${BACKEND_IMAGE}:${COMMIT_HASH}" -ForegroundColor Yellow
Write-Host "Frontend Image: ${FRONTEND_IMAGE}:${COMMIT_HASH}" -ForegroundColor Yellow
Write-Host ""

# Build işlemi
if (-not $DeployOnly) {
    Write-Host "🔨 Building Docker images..." -ForegroundColor Cyan
    
    # Backend build
    Write-Host "Building backend..." -ForegroundColor Yellow
    Set-Location task-tracker-backend
    docker build -t "${BACKEND_IMAGE}:${COMMIT_HASH}" .
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Backend build failed!" -ForegroundColor Red
        exit 1
    }
    Set-Location ..
    
    # Frontend build
    Write-Host "Building frontend..." -ForegroundColor Yellow
    Set-Location task-tracker-frontend
    docker build -t "${FRONTEND_IMAGE}:${COMMIT_HASH}" .
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Frontend build failed!" -ForegroundColor Red
        exit 1
    }
    Set-Location ..
    
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
    
    # Docker Hub'a push
    $push = Read-Host "Docker Hub'a push etmek istiyor musunuz? (y/n)"
    if ($push -eq "y" -or $push -eq "Y") {
        Write-Host "📤 Pushing to Docker Hub..." -ForegroundColor Cyan
        docker push "${BACKEND_IMAGE}:${COMMIT_HASH}"
        docker push "${FRONTEND_IMAGE}:${COMMIT_HASH}"
        Write-Host "✅ Push completed!" -ForegroundColor Green
    }
}

# Deploy işlemi
if (-not $BuildOnly) {
    Write-Host ""
    Write-Host "🚀 Deploying with commit hash: $COMMIT_HASH" -ForegroundColor Cyan
    
    # Environment variable set et
    $env:COMMIT_HASH = $COMMIT_HASH
    
    # Docker compose ile deploy
    Set-Location task-tracker-devops
    
    # Mevcut containerları durdur
    docker-compose -f docker-compose.template.yml down
    
    # Yeni containerları başlat
    docker-compose -f docker-compose.template.yml up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Deployment successful!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🌐 Uygulamanız çalışıyor:" -ForegroundColor Cyan
        Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
        Write-Host "   Backend:  http://localhost:8000" -ForegroundColor White
        Write-Host ""
        Write-Host "📊 Container durumunu kontrol etmek için:" -ForegroundColor Yellow
        Write-Host "   docker-compose -f docker-compose.template.yml ps" -ForegroundColor White
    } else {
        Write-Host "❌ Deployment failed!" -ForegroundColor Red
        exit 1
    }
    
    Set-Location ..
}

Write-Host ""
Write-Host "🎉 İşlem tamamlandı!" -ForegroundColor Green
