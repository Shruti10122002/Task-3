// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const validateStudent = require('../middleware/validateStudent');

const dbPath = path.join(__dirname, '../data/students.json');

const getStudents = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const saveStudents = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// GET - Show dashboard
router.get('/', (req, res) => {
  const students = getStudents();
  res.render('students', { students });
});

// POST - Add new student
router.post('/', validateStudent, (req, res) => {
  const students = getStudents();
  const newStudent = {
    id: students.length + 1,
    name: req.body.name.trim(),
    email: req.body.email.trim()
  };
  students.push(newStudent);
  saveStudents(students);
  res.redirect('/students');
});

module.exports = router;