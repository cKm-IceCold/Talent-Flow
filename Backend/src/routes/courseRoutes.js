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
const { verifyToken, verifyRole } = require('../middleware/auth.middleware');

router.route('/').get(getCourses).post(verifyToken, verifyRole(['Mentor', 'Admin']), createCourse);
router.route('/:id').get(getCourseById).put(verifyToken, verifyRole(['Mentor', 'Admin']), updateCourse).delete(verifyToken, verifyRole(['Admin']), deleteCourse);

module.exports = router;