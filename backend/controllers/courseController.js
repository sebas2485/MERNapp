const { Course, Module } = require('../config/db');

/**
 * Get all courses
 */
exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

/**
 * Get course by ID with its modules
 */
exports.getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id, { include: [{ model: Module }] });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new course
 * Admin only
 */
exports.createCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const course = await Course.create({ title, description });
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

/**
 * Update a course
 * Admin only
 */
exports.updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    if (title) course.title = title;
    if (description) course.description = description;
    await course.save();
    res.json(course);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a course
 * Admin only
 */
exports.deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    await course.destroy();
    res.json({ message: 'Course deleted.' });
  } catch (err) {
    next(err);
  }
};