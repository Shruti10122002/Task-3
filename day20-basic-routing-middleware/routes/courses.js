const express = require('express');
const validateCourseId = require('../middleware/validateCourseId');

const router = express.Router();

// Dummy Database (In-memory courses)
const courses = {
  101: { id: "101", name: "React Mastery", duration: "6 weeks" },
  102: { id: "102", name: "Node.js Advanced", duration: "8 weeks" },
  103: { id: "103", name: "Full Stack MERN", duration: "10 weeks" },
  104: { id: "104", name: "TypeScript Pro", duration: "5 weeks" }
};


router.get('/:id', validateCourseId, (req, res) => {
  const course = courses[req.courseId];

  if (!course) {
    return res.status(404).json({
      error: "Course not found"
    });
  }

  res.json(course);
});

module.exports = router;