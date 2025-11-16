// routes/products.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { name } = req.query;
  if (name) {
    res.json({ query: name }); // Bonus: JSON format
  } else {
    res.status(400).send('Please provide a product name');
  }
});

module.exports = router;