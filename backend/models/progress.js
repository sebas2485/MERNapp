// backend/models/progress.js
const { Model, DataTypes } = require('sequelize');
/**
 * Progress model: tracking user completion per module
 * @property {integer} id - Primary key
 * @property {integer} user_id - FK to User
 * @property {integer} module_id - FK to Module
 * @property {boolean} completed - Completion status
 * @property {Date|null} completed_at - Timestamp when completed
 */
module.exports = (sequelize) => {
  class Progress extends Model {}
  Progress.init({
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
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'modules', key: 'id' },
      onDelete: 'CASCADE',
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Progress',
    tableName: 'progress',
    timestamps: false,
    underscored: true,
    indexes: [
      { unique: true, fields: ['user_id', 'module_id'] }
    ]
  });
  return Progress;
};
