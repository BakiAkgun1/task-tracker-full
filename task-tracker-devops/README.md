# 🚀 Task Tracker DevOps - Docker & CI/CD

Docker containerization ve GitHub Actions ile otomatik deployment yapılandırması. Production-ready DevOps pipeline.

## 📦 Container Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │
│   (React)       │    │   (FastAPI)     │
│   Port: 3000    │◄──►│   Port: 8000    │
│   nginx:alpine  │    │   python:3.11   │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┘
                   │
         ┌─────────────────┐
         │   Database      │
         │   (SQLite)      │
         │   Volume Mount  │
         └─────────────────┘
```

## 🐳 Docker Konfigürasyonu

### Backend Dockerfile
```dockerfile
FROM python:3.11

WORKDIR /app

# Dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Application code
COPY ./app ./app

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Frontend Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm install

# Application code
COPY . .

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Run application
CMD ["npm", "start"]
```

## 🔧 Docker Compose

### Template Yapılandırması
```yaml
# docker-compose.template.yml
services:
  backend:
    image: bakiakgun/task-tracker-backend:${COMMIT_HASH}
    container_name: task-tracker-backend
    ports:
      - "8000:8000"
    volumes:
      - ./myapp/tasks.db:/app/tasks.db
    environment:
      - PYTHONPATH=/app
      - ENVIRONMENT=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    image: bakiakgun/task-tracker-frontend:${COMMIT_HASH}
    container_name: task-tracker-frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8000
    restart: unless-stopped
    depends_on:
      - backend
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  default:
    name: task-tracker-network
```

## 🔄 CI/CD Pipeline

### Build Workflow
```yaml
# .github/workflows/build-and-push.yml
name: Build and Push Docker Images

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          submodules: recursive
          
      - name: Get commit hash
        id: commit
        run: echo "hash=$(git rev-parse --short HEAD)" >> $GITHUB_OUTPUT
        
      - name: Build and push backend
        uses: docker/build-push-action@v5
        with:
          context: ./task-tracker-backend
          push: true
          tags: bakiakgun/task-tracker-backend:${{ steps.commit.outputs.hash }}
          
      - name: Build and push frontend
        uses: docker/build-push-action@v5
        with:
          context: ./task-tracker-frontend
          push: true
          tags: bakiakgun/task-tracker-frontend:${{ steps.commit.outputs.hash }}
```

### Deploy Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  workflow_run:
    workflows: ["Build and Push Docker Images"]
    types: [completed]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy with Docker Compose
        run: |
          export COMMIT_HASH=${{ steps.commit.outputs.hash }}
          docker-compose -f docker-compose.template.yml up -d
```

## 🏷 Versiyonlama Stratejisi

### Commit Hash Versioning
```bash
# Hash generation
COMMIT_HASH=$(git rev-parse --short HEAD)  # Örnek: a1b2c3d

# Image tagging
bakiakgun/task-tracker-backend:a1b2c3d
bakiakgun/task-tracker-frontend:a1b2c3d
```

### Versiyonlama Avantajları
- ✅ **Eşsizlik**: Her commit benzersiz hash
- ✅ **Traceability**: Hangi kod versiyonu çalışıyor?
- ✅ **Rollback**: Eski hash ile geri dönüş
- ✅ **No Conflicts**: Latest tag karışıklığı yok

## 🚀 Deployment Scripts

### PowerShell Script (Windows)
```powershell
# deploy.ps1
param(
    [switch]$BuildOnly,
    [switch]$DeployOnly,
    [string]$CommitHash = ""
)

# Get commit hash
if ($CommitHash -eq "") {
    $COMMIT_HASH = git rev-parse --short HEAD
} else {
    $COMMIT_HASH = $CommitHash
}

# Build images
if (-not $DeployOnly) {
    docker build -t bakiakgun/task-tracker-backend:$COMMIT_HASH ./task-tracker-backend
    docker build -t bakiakgun/task-tracker-frontend:$COMMIT_HASH ./task-tracker-frontend
    
    # Push to Docker Hub
    docker push bakiakgun/task-tracker-backend:$COMMIT_HASH
    docker push bakiakgun/task-tracker-frontend:$COMMIT_HASH
}

# Deploy
if (-not $BuildOnly) {
    $env:COMMIT_HASH = $COMMIT_HASH
    cd task-tracker-devops
    docker-compose -f docker-compose.template.yml up -d
}
```

### Bash Script (Linux/Mac)
```bash
#!/bin/bash
# build-images.sh

COMMIT_HASH=$(git rev-parse --short HEAD)
DOCKER_USER="bakiakgun"

echo "Building with hash: $COMMIT_HASH"

# Build backend
cd task-tracker-backend
docker build -t "$DOCKER_USER/task-tracker-backend:$COMMIT_HASH" .
docker push "$DOCKER_USER/task-tracker-backend:$COMMIT_HASH"
cd ..

# Build frontend
cd task-tracker-frontend
docker build -t "$DOCKER_USER/task-tracker-frontend:$COMMIT_HASH" .
docker push "$DOCKER_USER/task-tracker-frontend:$COMMIT_HASH"
cd ..

echo "Build completed: $COMMIT_HASH"
```

## 🔍 Monitoring & Health Checks

### Container Health Monitoring
```bash
# Container durumunu kontrol et
docker ps

# Health check durumu
docker inspect task-tracker-backend | grep Health
docker inspect task-tracker-frontend | grep Health

# Logları izle
docker logs -f task-tracker-backend
docker logs -f task-tracker-frontend
```

### System Resources
```bash
# Resource kullanımı
docker stats

# Disk kullanımı
docker system df

# Temizlik
docker system prune -f
```

## 🛡 Security Best Practices

### Container Security
- ✅ **Non-root user**: Container'lar root olarak çalışmaz
- ✅ **Minimal base images**: Alpine Linux kullanımı
- ✅ **No secrets in images**: Environment variables ile
- ✅ **Regular updates**: Base image güncellemeleri
- ✅ **Health checks**: Container durumu izleme

### Network Security
```yaml
# Network isolation
networks:
  task-tracker-network:
    driver: bridge
    internal: false  # External access için

# Port exposure
ports:
  - "3000:3000"  # Sadece gerekli portlar
  - "8000:8000"
```

## 📊 Performance Optimization

### Build Optimization
```dockerfile
# Multi-stage build
FROM node:20-alpine AS builder
# Build stage

FROM nginx:alpine AS production
# Production stage
```

### Caching Strategy
```yaml
# Docker build cache
cache-from: type=gha
cache-to: type=gha,mode=max

# Layer caching
COPY package*.json ./  # Dependencies önce
RUN npm install        # Cache layer
COPY . .              # Source code sonra
```

## 🔄 Backup & Recovery

### Database Backup
```bash
# SQLite backup
docker exec task-tracker-backend sqlite3 /app/tasks.db ".backup /backup/tasks_$(date +%Y%m%d).db"

# Volume backup
docker run --rm -v task-tracker_data:/data -v $(pwd):/backup alpine tar czf /backup/data_backup.tar.gz -C /data .
```

### Disaster Recovery
```bash
# Rollback to previous version
export COMMIT_HASH="previous_hash"
docker-compose -f docker-compose.template.yml up -d

# Database restore
docker exec task-tracker-backend sqlite3 /app/tasks.db ".restore /backup/tasks_backup.db"
```

## 🌍 Multi-Environment Setup

### Environment Configurations
```yaml
# docker-compose.dev.yml
services:
  backend:
    image: bakiakgun/task-tracker-backend:dev
    environment:
      - ENVIRONMENT=development
      - DEBUG=true
    volumes:
      - ./task-tracker-backend:/app  # Hot reload

# docker-compose.prod.yml
services:
  backend:
    image: bakiakgun/task-tracker-backend:${COMMIT_HASH}
    environment:
      - ENVIRONMENT=production
      - DEBUG=false
    restart: unless-stopped
```

### Environment Variables
```bash
# Development
export ENVIRONMENT=development
export DEBUG=true
export REACT_APP_API_URL=http://localhost:8000

# Production
export ENVIRONMENT=production
export DEBUG=false
export REACT_APP_API_URL=https://api.yourdomain.com
```

## 📈 Scaling Considerations

### Horizontal Scaling
```yaml
# docker-compose.scale.yml
services:
  backend:
    deploy:
      replicas: 3
    ports:
      - "8000-8002:8000"
      
  frontend:
    deploy:
      replicas: 2
    ports:
      - "3000-3001:3000"
```

### Load Balancing
```yaml
# nginx load balancer
upstream backend {
    server backend1:8000;
    server backend2:8000;
    server backend3:8000;
}

server {
    location /api/ {
        proxy_pass http://backend;
    }
}
```

## 🔧 Troubleshooting

### Common Issues

#### Container Won't Start
```bash
# Check logs
docker logs task-tracker-backend

# Check health
docker exec task-tracker-backend curl http://localhost:8000/health

# Restart container
docker restart task-tracker-backend
```

#### Port Conflicts
```bash
# Find process using port
netstat -tulpn | grep :8000
lsof -i :8000

# Kill process
kill -9 <PID>
```

#### Database Issues
```bash
# Check database file
docker exec task-tracker-backend ls -la /app/tasks.db

# Database integrity
docker exec task-tracker-backend sqlite3 /app/tasks.db "PRAGMA integrity_check;"
```

## 📋 Deployment Checklist

### Pre-deployment
- [ ] Code review completed
- [ ] Tests passing
- [ ] Docker images built
- [ ] Images pushed to registry
- [ ] Environment variables set
- [ ] Database backup created

### Deployment
- [ ] Stop old containers
- [ ] Pull new images
- [ ] Start new containers
- [ ] Health checks passing
- [ ] Application accessible

### Post-deployment
- [ ] Monitor logs
- [ ] Check performance metrics
- [ ] Verify functionality
- [ ] Update documentation

## 📊 Metrics & Logging

### Application Metrics
```bash
# Container metrics
docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"

# Application logs
docker logs --tail 100 -f task-tracker-backend
```

### Log Aggregation
```yaml
# ELK Stack integration
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

## 🤝 Contributing

### DevOps Contributions
1. Infrastructure improvements
2. CI/CD optimizations
3. Security enhancements
4. Performance tuning
5. Documentation updates

### Pull Request Process
1. Test deployment locally
2. Update documentation
3. Ensure security compliance
4. Performance impact assessment

---

## 📞 DevOps Support

DevOps ile ilgili sorularınız için:
- GitHub Issues: Infrastructure problems
- Discussions: Architecture decisions
- Wiki: Runbooks and procedures
