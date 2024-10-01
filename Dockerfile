FROM node:20.16.0-alpine AS base

ENV NODE_ENV=production
WORKDIR /app

COPY . .

RUN npm install

CMD ["node", "server.js"]
