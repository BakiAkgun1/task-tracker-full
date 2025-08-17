#!/bin/bash

# Git commit hash'ini al (kısa versiyon - 7 karakter)
COMMIT_HASH=$(git rev-parse --short HEAD)

# Docker Hub kullanıcı adınız
DOCKER_USER="bakiakgun"

# İmaj isimleri
BACKEND_IMAGE="$DOCKER_USER/task-tracker-backend"
FRONTEND_IMAGE="$DOCKER_USER/task-tracker-frontend"

echo "Building images with commit hash: $COMMIT_HASH"

# Backend imajını build et
echo "Building backend image..."
cd task-tracker-backend
docker build -t "$BACKEND_IMAGE:$COMMIT_HASH" .
cd ..

# Frontend imajını build et
echo "Building frontend image..."
cd task-tracker-frontend
docker build -t "$FRONTEND_IMAGE:$COMMIT_HASH" .
cd ..

echo "Images built successfully!"
echo "Backend: $BACKEND_IMAGE:$COMMIT_HASH"
echo "Frontend: $FRONTEND_IMAGE:$COMMIT_HASH"

# Docker Hub'a push et (isteğe bağlı)
read -p "Docker Hub'a push etmek istiyor musunuz? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Pushing images to Docker Hub..."
    docker push "$BACKEND_IMAGE:$COMMIT_HASH"
    docker push "$FRONTEND_IMAGE:$COMMIT_HASH"
    echo "Images pushed successfully!"
fi
