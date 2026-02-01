# 🐳 Running ReaDefy with Docker

## Quick Start

Run the **entire application** with one command:

```bash
docker-compose up
```

That's it! The application will be available at:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:3001
- **MySQL**: localhost:3306

---

## First-Time Setup

### 1. Prerequisites
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Ensure Docker is running

### 2. Configure Environment Variables

```bash
# Copy the example file
cp .env.docker.example .env.docker

# Edit .env.docker with your values
# IMPORTANT: Change JWT_SECRET and passwords for production!
```

**Generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Build and Start

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

---

## Docker Commands Reference

### Managing Services

```bash
# Start all services in background
docker-compose up -d

# Start and rebuild
docker-compose up --build

# Stop all services
docker-compose down

# Stop and remove volumes (DELETES DATABASE!)
docker-compose down -v

# View logs
docker-compose logs -f [service_name]

# Restart a specific service
docker-compose restart backend
```

### Accessing Containers

```bash
# Access MySQL
docker exec -it readefy-mysql mysql -u readefy_user -p readefy_db

# Access backend shell
docker exec -it readefy-backend sh

# Access frontend shell
docker exec -it readefy-frontend sh
```

### Database Management

```bash
# View database tables
docker exec -it readefy-mysql mysql -u root -p -e "USE readefy_db; SHOW TABLES;"

# Backup database
docker exec readefy-mysql mysqldump -u root -p readefy_db > backup.sql

# Restore database
docker exec -i readefy-mysql mysql -u root -p readefy_db < backup.sql
```

---

## Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (React + Nginx)        │
│         Port: 80                        │
│         Container: readefy-frontend     │
└─────────────────┬───────────────────────┘
                  │
                  │ HTTP API Calls
                  ▼
┌─────────────────────────────────────────┐
│         Backend (Node.js/Express)       │
│         Port: 3001                      │
│         Container: readefy-backend      │
└─────────────────┬───────────────────────┘
                  │
                  │ MySQL Queries
                  ▼
┌─────────────────────────────────────────┐
│         Database (MySQL 8.0)            │
│         Port: 3306                      │
│         Container: readefy-mysql        │
│         Volume: mysql_data              │
└─────────────────────────────────────────┘
```

---

## Environment Variables

### Required in `.env.docker`:

| Variable | Description | Example |
|----------|-------------|---------|
| `MYSQL_ROOT_PASSWORD` | MySQL root password | `secure_root_pass` |
| `MYSQL_PASSWORD` | MySQL user password | `secure_user_pass` |
| `JWT_SECRET` | Secret for JWT tokens | `64_char_random_hex` |
| `VITE_GROQ_API_KEY` | Groq API key for AI features | `gsk_...` |

### Optional:

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:3001/api` | Backend API URL |

---

## Production Deployment

### Security Checklist

- [ ] Change all default passwords
- [ ] Generate secure JWT secret (64+ chars)
- [ ] Use HTTPS (add reverse proxy like Traefik/Nginx)
- [ ] Set proper CORS_ORIGIN in backend
- [ ] Enable firewall rules
- [ ] Regular database backups
- [ ] Update VITE_API_URL to production domain

### Example Production Setup

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  frontend:
    environment:
      - VITE_API_URL=https://api.yourapp.com/api
  backend:
    environment:
      - CORS_ORIGIN=https://yourapp.com
```

Run with:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

---

## Troubleshooting

### Database Connection Errors
```bash
# Check if MySQL is healthy
docker-compose ps

# View MySQL logs
docker-compose logs mysql

# Restart MySQL
docker-compose restart mysql
```

### Backend Not Starting
```bash
# Check backend logs
docker-compose logs backend

# Ensure MySQL is ready
docker-compose up mysql
# Wait for "ready for connections"
# Then start backend
docker-compose up backend
```

### Port Already in Use
```bash
# Change ports in docker-compose.yml
ports:
  - "8080:80"  # Frontend on port 8080
  - "3002:3001"  # Backend on port 3002
```

### Clean Slate
```bash
# Remove everything and start fresh
docker-compose down -v
docker system prune -a
docker-compose up --build
```

---

## Data Persistence

Database data is stored in a Docker volume named `mysql_data`. This persists even when containers are stopped.

To backup:
```bash
docker run --rm --volumes-from readefy-mysql -v $(pwd):/backup alpine tar czf /backup/mysql-backup.tar.gz /var/lib/mysql
```

To restore:
```bash
docker run --rm --volumes-from readefy-mysql -v $(pwd):/backup alpine tar xzf /backup/mysql-backup.tar.gz -C /
```

---

## Development vs Production

**Development** (current setup):
- Uses ports 80, 3001, 3306
- Hot reload disabled (rebuild needed for changes)
- Suitable for demo/testing

**Production**:
- Use environment-specific configs
- Enable HTTPS
- Use secrets management
- Implement monitoring/logging
- Set up automated backups

---

## Need Help?

Check the main [README.md](./README.md) for application-specific documentation.

For Docker issues, check the [Docker documentation](https://docs.docker.com/).
