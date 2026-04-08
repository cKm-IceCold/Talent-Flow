const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

// Assuming auth middleware exists (from Engineer A)
const { protect, mentorOrAdmin } = require('../middleware/authMiddleware');

router.route('/').get(getCourses).post(protect, mentorOrAdmin, createCourse);
router.route('/:id').get(getCourseById).put(protect, mentorOrAdmin, updateCourse).delete(protect, mentorOrAdmin, deleteCourse);

module.exports = router;