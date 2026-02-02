# ReaDefy - Smart PDF Reader & Study Companion 📚

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

ReaDefy is a modern, web-based intelligent PDF reader designed to supercharge your reading and study experience. By integrating advanced AI tools directly into the viewing experience, ReaDefy transforms passive reading into active learning.

---

## 🚀 Key Features

### 📖 Advanced PDF Viewer

- **Smooth Rendering**: High-performance PDF viewing using PDF.js
- **Text Selection**: Select text to interact with AI tools
- **Annotation Tools**: Highlight text and draw freehand on documents
- **Navigation**: Easy page jumping, zooming, and scrolling

### 🤖 AI-Powered Study Tools

Powered by **Groq API** (Llama-3.3-70b):

- **🌍 Translate**: Instantly translate selected text into 10+ languages
- **📝 Summarize**: Get concise summaries (Short/Medium/Long)
- **❓ Quiz Generation**: Auto-generate interactive multiple-choice quizzes with explanations

### 💬 Global Chat & Collaboration

- **Real-Time Chat**: Discuss documents with other users
- **Live Updates**: Messages sync instantly across sessions
- **User Identity**: Authenticated usernames for each participant

### 🔐 User & Data Management

- **Secure Authentication**: JWT-based signup and login
- **Study History**: Auto-saves translations, summaries, and quiz results
- **Persistence**: Annotations saved locally per PDF

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, React Router 7, PDF.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL 8.0
- **AI Integration**: Groq API (High-performance LLM)
- **DevOps**: Docker, Docker Compose, Nginx

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Quick Start (Docker)](#-quick-start-docker)
- [Manual Setup](#-manual-setup-without-docker)
- [Environment Variables](#-environment-variables)
- [Accessing from Other Devices](#-accessing-from-other-devices-on-your-network)
- [API Endpoints](#-api-endpoints)
- [Troubleshooting](#-troubleshooting)
- [Deployment](#-deployment)
- [Development](#-development)
- [Team](#-team-members)
- [License](#-license)

---

## 📦 Prerequisites

### For Docker Setup

- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/))
  - Windows: Docker Desktop 4.0+
  - Mac: Docker Desktop 4.0+
  - Linux: Docker Engine 20.10+ and Docker Compose 2.0+
- **Git** (for cloning the repository)

### For Manual Setup

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **MySQL Server** 8.0+ (via [XAMPP](https://www.apachefriends.org/), [MySQL Installer](https://dev.mysql.com/downloads/installer/), or Homebrew on Mac)
- **Git** (for cloning the repository)

---

## 🐳 Quick Start (Docker)

The **easiest and recommended** way to run ReaDefy is using Docker. This automatically sets up the frontend, backend, and database.

### Step 1: Clone the Repository

```bash
git clone https://github.com/nahidgaziang/PROJECT-250.git
cd PROJECT-250
```

### Step 2: Configure Environment Variables

```bash
cp .env.docker.example .env.docker
```

**Optional**: Edit `.env.docker` to add your Groq API key or change default passwords:

```bash
# Open in your preferred editor
nano .env.docker  # or: code .env.docker, vim .env.docker
```

Required variables:

- `VITE_GROQ_API_KEY`: Get free key from [console.groq.com](https://console.groq.com/)
- `MYSQL_PASSWORD`: Change from default `readefy123`
- `JWT_SECRET`: Change from default (generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)

### Step 3: Start the Application

```bash
docker compose up --build
```

**First-time setup** takes 2-3 minutes to build images and initialize the database.

### Step 4: Access the Application

Once you see "ReaDefy Backend Server running on port 3001", open your browser:

- **Frontend**: [http://localhost](http://localhost)
- **Backend API**: [http://localhost:3001](http://localhost:3001)
- **Database**: `localhost:3307` (User: `readefy_user`, Password: from `.env.docker`)

> **Note**: The database uses port **3307** (not 3306) to avoid conflicts with local MySQL installations.

### Stopping the Application

```bash
# Stop containers (preserves data)
docker compose down

# Stop and remove all data
docker compose down -v
```

### Platform-Specific Notes

<details>
<summary><b>Windows</b></summary>

- Ensure Docker Desktop is running before executing commands
- Use PowerShell or Command Prompt (not Git Bash for Docker commands)
- If you get "port already allocated" errors, see [Troubleshooting](#port-conflicts)
</details>

<details>
<summary><b>macOS</b></summary>

- Ensure Docker Desktop is running (check menu bar icon)
- Apple Silicon (M1/M2): Images will build for ARM architecture automatically
- Intel Macs: No special configuration needed
</details>

<details>
<summary><b>Linux</b></summary>

- Install Docker Engine and Docker Compose separately
- Add your user to the docker group: `sudo usermod -aG docker $USER`
- Log out and back in for group changes to take effect
- Use `docker compose` (not `docker-compose` for newer versions)
</details>

---

## 💻 Manual Setup (Without Docker)

If you prefer running each component separately or want to contribute to development:

### Step 1: Clone the Repository

```bash
git clone https://github.com/nahidgaziang/PROJECT-250.git
cd PROJECT-250
```

### Step 2: Database Setup

#### Option A: Using XAMPP (Windows/Mac/Linux)

1. **Install XAMPP**: Download from [apachefriends.org](https://www.apachefriends.org/)
2. **Start MySQL**: Open XAMPP Control Panel → Start MySQL
3. **Create Database**:

   ```bash
   # Open MySQL shell
   mysql -u root -p  # Press Enter when prompted for password (default is empty)

   # Run schema files
   mysql -u root < database/schema.sql
   mysql -u root < database/chat_schema.sql
   ```

#### Option B: Using MySQL Server (Mac with Homebrew)

```bash
# Install MySQL
brew install mysql

# Start MySQL
brew services start mysql

# Create database
mysql -u root < database/schema.sql
mysql -u root < database/chat_schema.sql
```

#### Option C: Using MySQL Installer (Windows)

1. Download [MySQL Installer](https://dev.mysql.com/downloads/installer/)
2. Install MySQL Server 8.0+
3. Set root password during installation
4. Run schema files:
   ```cmd
   mysql -u root -p < database\schema.sql
   mysql -u root -p < database\chat_schema.sql
   ```

### Step 3: Backend Setup

```bash
# Navigate to server directory
cd server

# Copy environment template
cp .env.example .env

# Edit .env file (use your preferred editor)
nano .env  # or: code .env, vim .env
```

**Configure `.env`** (server/.env):

```env
PORT=3001

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=           # Your MySQL root password (empty for XAMPP)
DB_NAME=readefy_db
DB_PORT=3306

# JWT Secret (generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
JWT_SECRET=your_secure_random_jwt_secret_here

# CORS (adjust if frontend runs on different port)
CORS_ORIGIN=http://localhost:5173
```

**Install dependencies and start**:

```bash
npm install
npm start
```

Server will run at `http://localhost:3001`

### Step 4: Frontend Setup

Open a **new terminal** (keep backend running):

```bash
# Navigate to project root
cd PROJECT-250  # or wherever you cloned it

# Copy environment template
cp .env.example .env

# Edit .env file
nano .env  # or: code .env, vim .env
```

**Configure `.env`** (root directory):

```env
# Backend API URL
VITE_API_URL=http://localhost:3001/api

# Groq API Key (get from https://console.groq.com/)
VITE_GROQ_API_KEY=your_groq_api_key_here
```

**Install dependencies and start**:

```bash
npm install
npm run dev
```

Frontend will run at `http://localhost:5173`

### Step 5: Verify Installation

1. Open browser: [http://localhost:5173](http://localhost:5173)
2. Click **Sign Up** and create an account
3. If successful, you're all set! 🎉

---

## 🌐 Accessing from Other Devices on Your Network

To access ReaDefy from other devices (phones, tablets, other computers) on the same WiFi/LAN:

### For Docker Setup

1. **Find your computer's local IP address**:
   - **Windows**: `ipconfig` (look for "IPv4 Address")
   - **Mac/Linux**: `ifconfig` or `ip addr` (look for inet address, usually 192.168.x.x)

2. **Update CORS settings**:
   Edit `.env.docker`:

   ```env
   CORS_ORIGIN=*  # Allow all origins for local network access
   ```

3. **Restart containers**:

   ```bash
   docker compose down
   docker compose up --build
   ```

4. **Access from other devices**:
   - Frontend: `http://YOUR_IP_ADDRESS` (e.g., `http://192.168.1.100`)
   - Backend: `http://YOUR_IP_ADDRESS:3001`

### For Manual Setup

1. **Find your local IP** (same as above)

2. **Update backend CORS**:
   Edit `server/.env`:

   ```env
   CORS_ORIGIN=*  # or specify your device IP
   ```

3. **Update frontend API URL**:
   Edit `.env` (root directory):

   ```env
   VITE_API_URL=http://YOUR_IP_ADDRESS:3001/api
   ```

4. **Restart both servers**:

   ```bash
   # Terminal 1 (backend)
   cd server
   npm start

   # Terminal 2 (frontend)
   npm run dev -- --host
   ```

5. **Access from other devices**:
   - `http://YOUR_IP_ADDRESS:5173`

> **Security Note**: `CORS_ORIGIN=*` should only be used for local development, never in production.

---

## 🔧 Environment Variables

### Frontend (.env or .env.docker)

| Variable            | Description     | Default                     | Required |
| ------------------- | --------------- | --------------------------- | -------- |
| `VITE_API_URL`      | Backend API URL | `http://localhost:3001/api` | ✅       |
| `VITE_GROQ_API_KEY` | Groq AI API key | -                           | ✅       |

### Backend (server/.env or Docker env)

| Variable      | Description             | Default                            | Required |
| ------------- | ----------------------- | ---------------------------------- | -------- |
| `PORT`        | Server port             | `3001`                             | ✅       |
| `DB_HOST`     | MySQL host              | `localhost` (or `mysql` in Docker) | ✅       |
| `DB_USER`     | MySQL username          | `root`                             | ✅       |
| `DB_PASSWORD` | MySQL password          | Empty (XAMPP) or set value         | ✅       |
| `DB_NAME`     | Database name           | `readefy_db`                       | ✅       |
| `DB_PORT`     | MySQL port              | `3306`                             | ✅       |
| `JWT_SECRET`  | JWT signing secret      | -                                  | ✅       |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173`            | ✅       |

### Docker-Specific (.env.docker)

| Variable              | Description         | Default        | Required |
| --------------------- | ------------------- | -------------- | -------- |
| `MYSQL_ROOT_PASSWORD` | MySQL root password | `rootpassword` | ✅       |
| `MYSQL_PASSWORD`      | MySQL user password | `readefy123`   | ✅       |

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint           | Description        | Auth Required |
| ------ | ------------------ | ------------------ | ------------- |
| POST   | `/api/auth/signup` | Create new account | ❌            |
| POST   | `/api/auth/login`  | User login         | ❌            |
| GET    | `/api/auth/verify` | Verify JWT token   | ✅            |

### Chat (`/api/chat`)

| Method | Endpoint             | Description           | Auth Required |
| ------ | -------------------- | --------------------- | ------------- |
| GET    | `/api/chat/messages` | Get all chat messages | ✅            |
| POST   | `/api/chat/messages` | Send new message      | ✅            |

### Health Check

| Method | Endpoint      | Description          | Auth Required |
| ------ | ------------- | -------------------- | ------------- |
| GET    | `/api/health` | Server health status | ❌            |

---

## 🐛 Troubleshooting

### Port Conflicts

**Error**: `Bind for 0.0.0.0:3001 failed: port is already allocated`

**Solution**:

```bash
# Find what's using the port
lsof -i :3001          # Mac/Linux
netstat -ano | findstr :3001  # Windows

# Stop the conflicting service or change port in docker-compose.yml
```

### Database Connection Failed

**Error**: `ER_ACCESS_DENIED_ERROR` or `Connection refused`

**Docker**:

- Verify `.env.docker` credentials match `docker-compose.yml`
- Wait for healthcheck: `docker compose logs mysql`

**Manual**:

- Verify MySQL is running: `mysql -u root -p`
- Check `server/.env` credentials
- Ensure database exists: `SHOW DATABASES;`

### CORS Errors

**Error**: `Access to fetch... has been blocked by CORS policy`

**Solution**:

1. Verify `CORS_ORIGIN` in backend matches frontend URL exactly
2. No trailing slashes: use `http://localhost:3001`, not `http://localhost:3001/`
3. For cross-device: use `CORS_ORIGIN=*` (dev only)

### Build Errors

**Error**: `Module not found` or `npm ERR!`

**Solution**:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Docker cache and rebuild
docker compose down -v
docker compose build --no-cache
docker compose up
```

### Frontend Shows "Failed to fetch"

**Causes**:

1. Backend not running
2. Wrong `VITE_API_URL` (missing `/api` suffix)
3. CORS misconfiguration

**Solution**:

1. Check backend is running: visit `http://localhost:3001/api/health`
2. Verify `VITE_API_URL` ends with `/api`
3. Check browser console for exact error

---

## 🚀 Deployment

For deploying to production (Vercel, Render, etc.), see detailed instructions in:

📖 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Step-by-step deployment guide for free hosting

---

## 👨‍💻 Development

### Project Structure

```
PROJECT-250/
├── database/           # SQL schema files
├── server/             # Node.js/Express backend
│   ├── config/         # Database configuration
│   ├── middleware/     # Authentication middleware
│   ├── routes/         # API routes
│   ├── scripts/        # Utility scripts (DB seeding)
│   └── index.js        # Entry point
├── src/                # React frontend
│   ├── api/            # AI API integration
│   ├── components/     # UI components
│   ├── context/        # React context (Auth)
│   └── utils/          # Helper functions
├── public/             # Static assets
├── Dockerfile          # Frontend container
├── docker-compose.yml  # Multi-container orchestration
├── nginx.conf          # Production web server config
└── .env.example        # Environment template
```

### Development Commands

```bash
# Frontend (development server with hot reload)
npm run dev

# Backend (development server with auto-restart)
cd server
npm run dev

# Lint frontend code
npm run lint

# Build frontend for production
npm run build

# Preview production build locally
npm run preview
```

### Database Management

**Seeding remote cloud database**:

```bash
cd server
npm run seed  # Uses credentials from server/.env
```

**Reset local database**:

```bash
mysql -u root < database/schema.sql
mysql -u root < database/chat_schema.sql
```

---

## 👥 Team Members

Prepared by:

- **Nahid Gazi** - 2022331048
- **Md. Mahdiul Hasan** - 2022331076
- **Jonaki Rani Das** - 2022331038

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

- **PDF.js** - Mozilla's PDF rendering library
- **Groq** - Fast AI inference API
- **React** - UI framework
- **Express.js** - Backend framework
- **Docker** - Containerization platform

---

**Need Help?** Open an issue on [GitHub](https://github.com/nahidgaziang/PROJECT-250/issues) or contact the team.
