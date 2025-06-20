// backend/config/db.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

// Import models
const User = require('../models/user')(sequelize);
const Course = require('../models/course')(sequelize);
const Module = require('../models/module')(sequelize);
const Enrollment = require('../models/enrollment')(sequelize);
const Progress = require('../models/progress')(sequelize);

// Define associations
User.hasMany(Enrollment, { foreignKey: 'user_id' });
Course.hasMany(Enrollment, { foreignKey: 'course_id' });
Enrollment.belongsTo(User, { foreignKey: 'user_id' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id' });

Course.hasMany(Module, { foreignKey: 'course_id' });
Module.belongsTo(Course, { foreignKey: 'course_id' });

User.hasMany(Progress, { foreignKey: 'user_id' });
Module.hasMany(Progress, { foreignKey: 'module_id' });
Progress.belongsTo(User, { foreignKey: 'user_id' });
Progress.belongsTo(Module, { foreignKey: 'module_id' });

module.exports = { sequelize, User, Course, Module, Enrollment, Progress };
