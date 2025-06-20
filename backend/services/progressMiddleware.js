const { Progress, Module } = require('../config/db');

exports.markModuleComplete = async (userId, moduleId) => {
  const [progress, created] = await Progress.findOrCreate({ where: { user_id: userId, module_id: moduleId } });
  if (!progress.completed) {
    progress.completed = true;
    progress.completed_at = new Date();
    await progress.save();
  }
  return progress;
};

exports.getUserProgress = (userId) => Progress.findAll({ where: { user_id: userId }, include: [Module] });
