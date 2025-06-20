const { Module } = require('../config/db');

exports.createModule = (data) => Module.create(data);
exports.updateModule = async (id, updates) => {
  const module = await Module.findByPk(id);
  if (!module) return null;
  return module.update(updates);
};
exports.deleteModule = async (id) => {
  const module = await Module.findByPk(id);
  if (!module) return null;
  await module.destroy();
  return true;
};