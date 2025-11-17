const validateCourseId = (req, res, next) => {
  const { id } = req.params;

  // Check if ID contains only digits
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({
      error: "Invalid course ID"
    });
  }

  // Convert to number and attach to request
  req.courseId = Number(id);
  next();
};

module.exports = validateCourseId;