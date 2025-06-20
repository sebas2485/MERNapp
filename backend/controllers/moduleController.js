const { Module } = require('../config/db');

/**
 * Create a module under a specific course
 */
exports.createModule = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { title, content } = req.body;
    const module = await Module.create({ title, content, course_id: courseId });
    res.status(201).json(module);
  } catch (err) {
    next(err);
  }
};

/**
 * Update a module
 */
exports.updateModule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const module = await Module.findByPk(id);
    if (!module) return res.status(404).json({ message: 'Module not found.' });
    if (title) module.title = title;
    if (content) module.content = content;
    await module.save();
    res.json(module);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a module
 */
exports.deleteModule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const module = await Module.findByPk(id);
    if (!module) return res.status(404).json({ message: 'Module not found.' });
    await module.destroy();
    res.json({ message: 'Module deleted.' });
  } catch (err) {
    next(err);
  }
};