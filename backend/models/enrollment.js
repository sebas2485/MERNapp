// backend/models/enrollment.js
const { Model, DataTypes } = require('sequelize');
/**
 * Enrollment model: user-course relation
 * @property {integer} id - Primary key
 * @property {integer} user_id - FK to User
 * @property {integer} course_id - FK to Course
 * @property {string} status - 'enrolled', 'completed', 'cancelled'
 * @property {Date} enrolled_at - Enrollment timestamp
 */
module.exports = (sequelize) => {
  class Enrollment extends Model {}
  Enrollment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'courses', key: 'id' },
      onDelete: 'CASCADE',
    },
    status: {
      type: DataTypes.ENUM('enrolled', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'enrolled',
    },
    enrolled_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'Enrollment',
    tableName: 'enrollments',
    timestamps: false,
    underscored: true,
    indexes: [
      { unique: true, fields: ['user_id', 'course_id'] }
    ]
  });
  return Enrollment;
};
