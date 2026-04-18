const express = require('express');
const router = express.Router();
const {
  getUserEnrollments,
  enrollInCourse,
  updateEnrollmentStatus,
  getAllEnrollments
} = require('../controllers/enrollmentController');

// Auth middleware placeholders; actual role checks should be enforced here.
const { verifyToken, verifyRole } = require('../middleware/auth.middleware');

router.route('/').get(verifyToken, verifyRole(['Admin']), getAllEnrollments).post(verifyToken, enrollInCourse);
router.route('/:userId').get(verifyToken, getUserEnrollments);
router.route('/status/:id').put(verifyToken, updateEnrollmentStatus);

module.exports = router;