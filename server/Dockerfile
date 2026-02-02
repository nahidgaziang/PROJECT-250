# Backend Dockerfile for ReaDefy
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install build dependencies for bcrypt (required for Alpine)
RUN apk add --no-cache python3 make g++

# Install dependencies
RUN npm ci --only=production

# Remove build dependencies to reduce image size
RUN apk del python3 make g++

# Copy application files
COPY . .

# Expose port
EXPOSE 3001

# Start the server
CMD ["npm", "start"]
