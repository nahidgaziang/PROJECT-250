import express from 'express';
import { pool } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Fetch recent messages
router.get('/messages', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;

        const [messages] = await pool.query(
            `SELECT id, user_id, user_name, message, created_at 
             FROM chat_messages 
             ORDER BY created_at DESC 
             LIMIT ? OFFSET ?`,
            [limit, offset]
        );

        // Reverse to show oldest first
        res.json({ messages: messages.reverse() });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Send a new message
router.post('/messages', authenticateToken, async (req, res) => {
    const { message } = req.body;

    // Validation
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage.length === 0) {
        return res.status(400).json({ error: 'Message cannot be empty' });
    }

    if (trimmedMessage.length > 1000) {
        return res.status(400).json({ error: 'Message is too long (max 1000 characters)' });
    }

    try {
        // Get user name from database
        const [users] = await pool.query(
            'SELECT name FROM users WHERE id = ?',
            [req.user.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userName = users[0].name || 'Anonymous';

        // Insert message
        const [result] = await pool.query(
            'INSERT INTO chat_messages (user_id, user_name, message) VALUES (?, ?, ?)',
            [req.user.userId, userName, trimmedMessage]
        );

        // Return the created message
        const [newMessage] = await pool.query(
            'SELECT id, user_id, user_name, message, created_at FROM chat_messages WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: newMessage[0]
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

export default router;
