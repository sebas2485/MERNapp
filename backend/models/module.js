// backend/models/module.js
const { Model, DataTypes } = require('sequelize');
/**
 * Module model
 * @property {integer} id - Primary key
 * @property {string} title - Module title
 * @property {text} content - Module content
 * @property {integer} course_id - Foreign key to Course
 */
module.exports = (sequelize) => {
  class Module extends Model {}
  Module.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id',
      },
      onDelete: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'Module',
    tableName: 'modules',
    timestamps: false,
    underscored: true,
  });
  return Module;
};
