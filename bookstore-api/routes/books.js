// routes/books.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

let books = [
  { id: 1, title: '1984', author: 'Orwell' },
  { id: 2, title: 'The Alchemist', author: 'Coelho' }
];

// GET /books
router.get('/', (req, res) => res.json(books));

// GET /books/:id
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === +req.params.id);
  book ? res.json(book) : res.status(404).json({ error: 'Book not found' });
});

// POST /books
router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('author').trim().notEmpty().withMessage('Author is required')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, author } = req.body;
    const newBook = { id: Date.now(), title, author };
    books.push(newBook);
    res.status(201).json(newBook);
  }
);

// PUT /books/:id
router.put('/:id', (req, res) => {
  const book = books.find(b => b.id === +req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  res.json(book);
});

// DELETE /books/:id
router.delete('/:id', (req, res) => {
  const index = books.findIndex(b => b.id === +req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });
  books.splice(index, 1);
  res.json({ message: 'Book deleted' });
});

module.exports = router;