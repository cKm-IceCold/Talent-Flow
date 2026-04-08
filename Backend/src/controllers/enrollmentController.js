const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Controller methods for user enrollment operations.
// These methods should be protected by auth middleware to verify the
// requesting user has permissions to take the requested action.

// @desc    Get enrollments for a specific user
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

// @desc    Enroll a user in a course
// @route   POST /api/enrollments
// @access  Private (Intern)
const enrollInCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Validate course existence before creating the enrollment.
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Prevent duplicate enrollments for the same user and course.
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

// @desc    Update the status of an existing enrollment
// @route   PUT /api/enrollments/:id
// @access  Private
const updateEnrollmentStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.status = status || enrollment.status;
    const updatedEnrollment = await enrollment.save();
    res.json(updatedEnrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all enrollments in the system
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