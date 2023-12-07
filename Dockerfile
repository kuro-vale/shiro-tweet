FROM node:18-alpine3.18 AS builder

# must be set on build time
ENV REACT_APP_API="http://localhost:4000/"
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV NODE_ENV="production"
RUN npm ci --only=production && npm cache clean --force

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
