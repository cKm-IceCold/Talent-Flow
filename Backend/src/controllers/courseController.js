const Course = require('../models/Course');

// Controller methods for course-related operations.
// These are intended to be called from courseRoutes and rely on auth middleware
// to enforce permissions for protected operations.

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    // Populate mentor information and module references for richer response data.
    const courses = await Course.find().populate('mentor', 'name email').populate('modules');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('mentor', 'name email').populate('modules');

    if (course) {
      return res.json(course);
    }

    return res.status(404).json({ message: 'Course not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Mentor/Admin)
const createCourse = async (req, res) => {
  const { title, description, modules } = req.body;

  try {
    const course = new Course({
      title,
      description,
      mentor: req.user._id,
      modules: modules || []
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update course metadata
// @route   PUT /api/courses/:id
// @access  Private (Mentor/Admin)
const updateCourse = async (req, res) => {
  const { title, description, modules } = req.body;

  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.modules = modules || course.modules;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a course permanently
// @route   DELETE /api/courses/:id
// @access  Private (Admin)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};