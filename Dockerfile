FROM node:18 AS builder

WORKDIR /app

# Копируем package.json и package-lock.json из папки PING
COPY PING/package*.json ./

RUN npm install

# Копируем все остальные файлы из папки PING (включая tsconfig.json)
COPY PING/. .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./certs/cert.pem /etc/nginx/certs/cert.pem
COPY ./certs/privkey.pem /etc/nginx/certs/privkey.pem

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
