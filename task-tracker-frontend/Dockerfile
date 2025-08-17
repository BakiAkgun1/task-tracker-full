FROM node:20-alpine

WORKDIR /app

# Package dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Kaynak kodları kopyala
COPY . .

# React-scripts'i global olarak yükle (backup)
RUN npm install -g react-scripts || true

# Port expose et
EXPOSE 3000

# Uygulamayı başlat
CMD ["npx", "react-scripts", "start"]
