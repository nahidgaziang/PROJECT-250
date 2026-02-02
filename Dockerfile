# Frontend Dockerfile for ReaDefy
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Build Arguments
ARG VITE_API_URL
ARG VITE_GROQ_API_KEY

# Set Environment Variables
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_GROQ_API_KEY=$VITE_GROQ_API_KEY

# Build the application
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
