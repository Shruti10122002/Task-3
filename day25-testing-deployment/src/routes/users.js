const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  res.status(201).json({ message: 'User registered', user: { name, email } });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'test@skillsphere.com' && password === '123456') {
    res.json({ token: 'fake-jwt-token-123', user: { email } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;   // ← THIS WAS MISSING!