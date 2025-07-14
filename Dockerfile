# ---- Build Stage ----
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install && npm run build

# ---- Production Stage ----
FROM nginx:alpine

# Copy build output to Nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf



EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

