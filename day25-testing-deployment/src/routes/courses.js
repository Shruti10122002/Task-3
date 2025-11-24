const express = require('express');
const router = express.Router();

const courses = [
  { id: 1, title: "Node.js Mastery", instructor: "John" },
  { id: 2, title: "React in 7 Days", instructor: "Jane" }
];

router.get('/', (req, res) => {
  res.json({ success: true, data: courses });
});

router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json({ success: true, data: course });
});

router.post('/', (req, res) => {
  const { title, instructor } = req.body;
  if (!title || !instructor) {
    return res.status(400).json({ error: 'Title and instructor required' });
  }
  const newCourse = { id: courses.length + 1, title, instructor };
  courses.push(newCourse);
  res.status(201).json({ success: true, data: newCourse });
});

module.exports = router;   // ← THIS WAS MISSING!