const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware - CORS must come first
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Health check endpoint (no auth required)
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Debug endpoint to see what Clerk is setting (no auth required)
app.get('/api/debug/auth', (req, res) => {
  console.log('DEBUG - req.auth:', req.auth);
  console.log('DEBUG - Authorization header:', req.headers.authorization);
  res.json({ 
    auth: req.auth,
    userId: req.auth?.userId,
    hasAuth: !!req.auth,
    authKeys: Object.keys(req.auth || {})
  });
});

// Import routes
const studentRoutes = require('./routes/students');
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
