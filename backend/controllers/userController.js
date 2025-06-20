// File: backend/controllers/userController.js
const { User } = require('../config/db');

/**
 * Get current user profile
 * @param {import('express').Request} req - expects req.user set by auth middleware
 * @param {import('express').Response} res
 */
exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, { attributes: ['id', 'name', 'email', 'role', 'created_at', 'updated_at'] });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * Update current user profile
 * @param {import('express').Request} req - expects req.user, body may contain name, email, password
 * @param {import('express').Response} res
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password_hash = password;
    await user.save();
    res.json({ message: 'Profile updated.' });
  } catch (err) {
    next(err);
  }
};