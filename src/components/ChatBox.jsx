import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function ChatBox({ onClose }) {
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);
    const pollingIntervalRef = useRef(null);

    // Scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Fetch messages from API
    const fetchMessages = async () => {
        try {
            const response = await fetch(`${API_URL}/chat/messages?limit=50`);
            if (response.ok) {
                const data = await response.json();
                setMessages(data.messages || []);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Initial fetch
    useEffect(() => {
        setIsLoading(true);
        fetchMessages().finally(() => setIsLoading(false));

        // Set up polling every 3 seconds
        pollingIntervalRef.current = setInterval(fetchMessages, 3000);

        // Cleanup on unmount
        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        };
    }, []);

    // Send message
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert('Please sign in to send messages');
            return;
        }

        const trimmedMessage = newMessage.trim();
        if (!trimmedMessage) return;

        if (trimmedMessage.length > 1000) {
            alert('Message is too long (max 1000 characters)');
            return;
        }

        setIsSending(true);

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_URL}/chat/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ message: trimmedMessage })
            });

            if (response.ok) {
                setNewMessage('');
                // Immediately fetch new messages
                await fetchMessages();
            } else {
                const error = await response.json();
                alert(error.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    // Format timestamp
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        // If less than 24 hours, show time only
        if (diff < 24 * 60 * 60 * 1000) {
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        }
        // Otherwise show date and time
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="chat-panel">
            <div className="chat-header">
                <h3>💬 Global Chat</h3>
                <button className="chat-close-btn" onClick={onClose} aria-label="Close chat">
                    ✕
                </button>
            </div>

            <div className="chat-messages">
                {isLoading ? (
                    <div className="chat-loading">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="chat-empty">
                        <p>No messages yet. Be the first to say hello! 👋</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`chat-message ${msg.user_id === currentUser?.id ? 'own-message' : ''}`}
                        >
                            <div className="message-header">
                                <span className="message-author">{msg.user_name}</span>
                                <span className="message-time">{formatTime(msg.created_at)}</span>
                            </div>
                            <div className="message-content">{msg.message}</div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-container" onSubmit={handleSendMessage}>
                {currentUser ? (
                    <>
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            disabled={isSending}
                            maxLength={1000}
                        />
                        <button
                            type="submit"
                            className="chat-send-btn"
                            disabled={isSending || !newMessage.trim()}
                        >
                            {isSending ? '...' : '➤'}
                        </button>
                    </>
                ) : (
                    <div className="chat-login-prompt">
                        <p>Please sign in to send messages</p>
                    </div>
                )}
            </form>
        </div>
    );
}

export default ChatBox;
