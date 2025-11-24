const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

// Import Routes (Now they export router properly → no more crash!)
const courseRoutes = require('./routes/courses');
const userRoutes = require('./routes/users');

const app = express();

// ==================== Best Practices Middleware ====================
app.use(compression());                    // Enable gzip compression
app.use(cors());                           // Allow frontend (React) to connect
app.use(morgan('dev'));                    // Logging
app.use(express.json());                   // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files (from Day 24)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ==================== API Routes ====================
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);

// Health Check Endpoint (Required for Deployment)
app.get('/status', (req, res) => {
  res.status(200).json({
    message: 'App is live',
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root route (optional – nice to have)
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SkillSphere API',
    version: '1.0.0',
    endpoints: [
      'GET /status',
      'GET /api/courses',
      'POST /api/users/register',
      'POST /api/users/login'
    ]
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;