const { Progress, Module } = require('../config/db');

/**
 * Mark module as completed for current user
 */
exports.markProgress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { moduleId } = req.params;
    // Check module exists
    const module = await Module.findByPk(moduleId);
    if (!module) return res.status(404).json({ message: 'Module not found.' });
    const [progress, created] = await Progress.findOrCreate({ where: { user_id: userId, module_id: moduleId } });
    if (!progress.completed) {
      progress.completed = true;
      progress.completed_at = new Date();
      await progress.save();
    }
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

/**
 * Get progress records for current user
 */
exports.getUserProgress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const progresses = await Progress.findAll({ where: { user_id: userId }, include: [Module] });
    res.json(progresses);
  } catch (err) {
    next(err);
  }
};