const express = require('express');
const router = express.Router();
const {
  getUserEnrollments,
  enrollInCourse,
  updateEnrollmentStatus,
  getAllEnrollments
} = require('../controllers/enrollmentController');

// Auth middleware placeholders; actual role checks should be enforced here.
const { protect, admin } = require('../middleware/authMiddleware');

// Enrollment routes:
// - GET /api/enrollments        (admin only)
// - POST /api/enrollments       (create enrollment)
// - GET /api/enrollments/:userId (list a user's enrollments)
// - PUT /api/enrollments/status/:id (update enrollment status)
router.route('/').get(protect, admin, getAllEnrollments).post(protect, enrollInCourse);
router.route('/:userId').get(protect, getUserEnrollments);
router.route('/status/:id').put(protect, updateEnrollmentStatus);

module.exports = router;