const express = require('express');
const courseRoutes = require('./routes/courses');

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());

// Challenge 1: Root Route - Welcome Message
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to SkillSphere LMS API' 
  });
});

// Mount Courses Routes
app.use('/courses', courseRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found' 
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`SkillSphere LMS API running at http://localhost:${PORT}`);
  console.log(`Visit: http://localhost:${PORT} for welcome message`);
});