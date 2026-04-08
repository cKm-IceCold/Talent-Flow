const express = require('express');
const router = express.Router();
const {
  getUserEnrollments,
  enrollInCourse,
  updateEnrollmentStatus,
  getAllEnrollments
} = require('../controllers/enrollmentController');

// Assuming auth middleware exists
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getAllEnrollments).post(protect, enrollInCourse);
router.route('/:userId').get(protect, getUserEnrollments);
router.route('/status/:id').put(protect, updateEnrollmentStatus);

module.exports = router;