const { Enrollment, Course } = require('../config/db');

exports.findOrCreateEnrollment = (userId, courseId) => Enrollment.findOrCreate({ where: { user_id: userId, course_id: courseId } });
exports.getUserEnrollments = (userId) => Enrollment.findAll({ where: { user_id: userId }, include: [Course] });
exports.cancelEnrollment = async (id, userId) => {
  const enrollment = await Enrollment.findOne({ where: { id, user_id: userId } });
  if (!enrollment) return null;
  await enrollment.destroy();
  return true;
};