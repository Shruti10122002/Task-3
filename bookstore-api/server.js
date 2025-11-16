// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(require('./middleware/logger')); // Global logger

// Routes
app.get('/', (req, res) => res.send('Welcome to Express Server'));

app.get('/status', (req, res) => {
  res.json({ server: 'running', uptime: 'OK' });
});

app.use('/products', require('./routes/products'));
app.use('/books', require('./routes/books'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler (Bonus)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});