const express = require('express');
const http = require('http');
const path = require('path');
const multer = require('multer');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static('public'));
app.use('/materials', express.static(path.join(__dirname, 'uploads')));

// Multer setup - PDF only + safe filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, Date.now() + '-' + safeName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF allowed!'), false);
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Challenge 1 - Upload Route
app.post('/upload', upload.single('courseMaterial'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file or wrong type' });
  res.json({ message: `File uploaded successfully: ${req.file.filename}` });
});

// Socket.io - Real-time Chat (Challenge 3)
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    socket.emit('message', { user: 'System', text: `Welcome to ${room}!` });
  });

  socket.on('chatMessage', ({ room, msg, user }) => {
    io.to(room).emit('message', { user, text: msg });
  });

  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Day 24 Assignment running at http://localhost:${PORT}`);
});