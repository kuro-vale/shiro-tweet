FROM node:18-alpine3.18 AS builder

ENV NODE_ENV="production"
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

FROM nginx:alpine

ENV REACT_APP_API="api-here"
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
