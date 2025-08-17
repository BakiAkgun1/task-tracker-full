FROM node:20-alpine

WORKDIR /app

# Package dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Kaynak kodları kopyala
COPY . .

# Execute permission'ları düzelt
RUN chmod +x node_modules/.bin/react-scripts || true

# Port expose et
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"]
