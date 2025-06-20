const { Model, DataTypes } = require('sequelize');
/**
 * User model
 * @property {integer} id - Primary key
 * @property {string} name - User's name
 * @property {string} email - Unique user email
 * @property {string} password_hash - Hashed password
 * @property {string} role - 'admin' or 'student'
 */
module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Check password against stored hash
     * @param {string} candidatePassword - Plain text password
     * @returns {Promise<boolean>}
     */
    async validatePassword(candidatePassword) {
      const bcrypt = require('bcrypt');
      return bcrypt.compare(candidatePassword, this.password_hash);
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'student'),
      allowNull: false,
      defaultValue: 'student',
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt(10);
        user.password_hash = await bcrypt.hash(user.password_hash, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password_hash')) {
          const bcrypt = require('bcrypt');
          const salt = await bcrypt.genSalt(10);
          user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
      }
    }
  });
  return User;
};