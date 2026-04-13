const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

// Auth middleware placeholders. Engineer A should provide a concrete JWT
// implementation and role-based authorization checks.
const { protect, mentorOrAdmin } = require('../middleware/authMiddleware');

// Course routes:
// - GET /api/courses
// - POST /api/courses
// - GET /api/courses/:id
// - PUT /api/courses/:id
// - DELETE /api/courses/:id
router.route('/').get(getCourses).post(protect, mentorOrAdmin, createCourse);
router.route('/:id').get(getCourseById).put(protect, mentorOrAdmin, updateCourse).delete(protect, mentorOrAdmin, deleteCourse);

module.exports = router;