const { Enrollment, Course, User } = require('../config/db');

/**
 * Enroll current user in a course
 */
exports.enrollInCourse = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    // Check if course exists
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    // Create enrollment
    const [enrollment, created] = await Enrollment.findOrCreate({ where: { user_id: userId, course_id: courseId } });
    if (!created) return res.status(400).json({ message: 'Already enrolled.' });
    res.status(201).json(enrollment);
  } catch (err) {
    next(err);
  }
};

/**
 * Get enrollments of current user
 */
exports.getUserEnrollments = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const enrollments = await Enrollment.findAll({ where: { user_id: userId }, include: [Course] });
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};

/**
 * Cancel enrollment
 */
exports.cancelEnrollment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; // enrollment id
    const enrollment = await Enrollment.findOne({ where: { id, user_id: userId } });
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found.' });
    await enrollment.destroy();
    res.json({ message: 'Enrollment cancelled.' });
  } catch (err) {
    next(err);
  }
};
