import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'ReaDefy server is running' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
async function startServer() {
    // Test database connection first
    const dbConnected = await testConnection();

    if (!dbConnected) {
        console.error('⚠️  Failed to connect to database. Please check your XAMPP MySQL is running.');
        console.error('⚠️  Server will start anyway, but authentication will not work.');
    }

    app.listen(PORT, () => {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`🚀 ReaDefy Backend Server running on port ${PORT}`);
        console.log(`📍 API URL: http://localhost:${PORT}`);
        console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });
}

startServer();
