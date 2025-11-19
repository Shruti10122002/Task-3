// server.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = 3000;

// User Story 3: Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User Story 4: Morgan logging
app.use(morgan('dev'));

// User Story 1: Custom request logger
app.use(require('./middleware/logger'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/students', require('./routes/studentRoutes'));

// Home route
app.get('/', (req, res) => {
  res.redirect('/students');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send('<h1 style="color:red;text-align:center;margin-top:100px">404 - Page Not Found</h1>');
});

// User Story 5: Error Handling Middleware (4 parameters)
app.use((err, req, res, next) => {
  console.error('ERROR:', err.message);
  res.status(500).send(`
    <h1 style="color:red;text-align:center;margin-top:100px">
      Server Error!
    </h1>
    <p style="text-align:center">Something went wrong. Please try again later.</p>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log('=====================================');
  console.log('   SkillTrack Academy Dashboard');
  console.log(`   http://localhost:${PORT}`);
  console.log('=====================================');
});