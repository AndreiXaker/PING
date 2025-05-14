# Шаг 1: Сборка React-приложения
FROM node:18 AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json из папки PING
COPY PING/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код проекта из папки PING
COPY PING ./

# Собираем приложение
RUN npm run build

# Шаг 2: Настройка Nginx для раздачи собранного приложения
FROM nginx:alpine

# Копируем собранное приложение из шага 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем SSL-сертификаты в контейнер
COPY ./certs/cert.pem /etc/nginx/certs/cert.pem
COPY ./certs/privkey.pem /etc/nginx/certs/privkey.pem

# Открываем порты
EXPOSE 80
EXPOSE 443

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
