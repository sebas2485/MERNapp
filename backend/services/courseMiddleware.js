const { Course, Module } = require('../config/db');

exports.getAllCourses = () => Course.findAll();
exports.getCourseByIdWithModules = (id) => Course.findByPk(id, { include: [Module] });
exports.createCourse = (data) => Course.create(data);
exports.updateCourse = async (id, updates) => {
  const course = await Course.findByPk(id);
  if (!course) return null;
  return course.update(updates);
};
exports.deleteCourse = async (id) => {
  const course = await Course.findByPk(id);
  if (!course) return null;
  await course.destroy();
  return true;
};