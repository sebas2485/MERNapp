// backend/models/course.js
const { Model, DataTypes } = require('sequelize');
/**
 * Course model
 * @property {integer} id - Primary key
 * @property {string} title - Course title
 * @property {text} description - Course description
 * @property {Date} created_at - Creation timestamp
 */
module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'Course',
    tableName: 'courses',
    timestamps: false,
    underscored: true,
  });
  return Course;
};
