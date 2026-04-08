const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Get enrollments for a user
// @route   GET /api/enrollments/:userId
// @access  Private
const getUserEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.params.userId }).populate('course', 'title description');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private (Intern)
const enrollInCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const enrollment = new Enrollment({
      user: userId,
      course: courseId
    });

    const createdEnrollment = await enrollment.save();
    res.status(201).json(createdEnrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update enrollment status
// @route   PUT /api/enrollments/:id
// @access  Private
const updateEnrollmentStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (enrollment) {
      enrollment.status = status || enrollment.status;
      const updatedEnrollment = await enrollment.save();
      res.json(updatedEnrollment);
    } else {
      res.status(404).json({ message: 'Enrollment not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all enrollments (Admin)
// @route   GET /api/enrollments
// @access  Private (Admin)
const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('user', 'name email').populate('course', 'title');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserEnrollments,
  enrollInCourse,
  updateEnrollmentStatus,
  getAllEnrollments
};