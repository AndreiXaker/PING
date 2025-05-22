FROM node:18 AS builder

WORKDIR /app
COPY PING/package*.json ./
RUN npm install
COPY PING/ .
RUN npm run build && ls -la dist
