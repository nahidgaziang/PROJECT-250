# ReaDefy - Smart PDF Reader & Study Companion 📚

ReaDefy is a modern, web-based intelligent PDF reader designed to supercharge your reading and study experience. By integrating advanced AI tools directly into the viewing experience, ReaDefy transforms passive reading into active learning.

![ReaDefy Banner](https://via.placeholder.com/800x200?text=ReaDefy+-+Your+Smart+Study+Partner)

## 🚀 Key Features

### 📖 Advanced PDF Viewer
- **Smooth Rendering**: High-performance PDF viewing using PDF.js.
- **Text Selection**: Select text to interact with the AI tools.
- **Annotation Tools**: Highlight text and draw freehand on your documents.
- **Navigation**: Easy page jumping, zooming, and scrolling.

### 🤖 AI-Powered Study Tools
Powered by **Groq API** (Llama-3.3-70b):
- **🌍 Translate**: Instantly translate selected text into 10+ languages.
- **📝 Summarize**: Get concise summaries of long paragraphs or sections (Short/Medium/Long).
- **❓ Quiz Generation**: Automatically generate interactive multiple-choice quizzes (with explanations!) from your study material to test your knowledge.

### 💬 Global Chat & Collaboration
- **Real-Time Chat**: Discuss documents with other users in the global chat panel.
- **Live Updates**: Messages sync instantly across sessions.
- **User Identity**: See who's talking with authenticated usernames.

### 🔐 User & Data Management
- **Secure Authentication**: JWT-based Signup and Login system.
- **Study History**: Automatically saves your translations, summaries, and quiz results.
- **Persistence**: Annotations are saved locally per PDF.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, React Router 7, PDF.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL 8.0 (Relational Data)
- **AI Integration**: Groq API (High-performance LLM inference)
- **DevOps**: Docker, Docker Compose, Nginx

---

## 🐳 Quick Start (Docker)

The easiest way to run ReaDefy is using Docker. This sets up the Frontend, Backend, and Database automatically.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

### Steps
1. **Clone the repository** (if you haven't already).
2. **Configure Environment**:
   ```bash
   cp .env.docker.example .env.docker
   # (Optional) Edit .env.docker to add your own Groq API Key or change passwords
   ```
3. **Run**:
   ```bash
   docker-compose up
   ```
4. **Access the App**:
   - **Frontend**: [http://localhost](http://localhost)
   - **Backend API**: [http://localhost:3001](http://localhost:3001)

See [DOCKER.md](./DOCKER.md) for advanced deployment details.

---

## 💻 Manual Setup (Development)

If you prefer running locally without Docker:

### Prerequisites
- Node.js (v18+)
- MySQL Server (e.g., via XAMPP) running on port 3306

### 1. Database Setup
1. Start MySQL.
2. Run the schema scripts:
   ```bash
   mysql -u root < database/schema.sql
   mysql -u root < database/chat_schema.sql
   ```

### 2. Backend Setup
```bash
cd server
cp .env.example .env
# Edit .env to set DB credentials and JWT_SECRET
npm install
npm start
```
*Server runs at `http://localhost:3001`*

### 3. Frontend Setup
```bash
# In the project root
cp .env.example .env
# Edit .env to add your VITE_GROQ_API_KEY
npm install
npm run dev
```
*App runs at `http://localhost:5173`*

---

## 📂 Project Structure

```
PROJECT_250/
├── database/            # SQL Schema files
├── server/              # Node.js/Express Backend
│   ├── config/          # DB Configuration
│   ├── middleware/      # Auth Middleware
│   ├── routes/          # API Routes (auth, chat)
│   └── index.js         # Entry point
├── src/                 # React Frontend
│   ├── api/             # AI API Integration
│   ├── components/      # UI Components (ChatBox, Tools, etc.)
│   ├── context/         # Auth Context
│   └── utils/           # Helper functions
├── Dockerfile           # Frontend Container Config
├── docker-compose.yml   # Docker Orchestration
└── nginx.conf           # Web Server Config
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