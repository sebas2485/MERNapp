// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const { User } = require('../config/db');
/**
 * Register new user
 * @param {Request} req - body: { name, email, password }
 * @param {Response} res
 */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered.' });
    }
    const user = await User.create({ name, email, password_hash: password });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

/**
 * Login user
 * @param {Request} req - body: { email, password }
 * @param {Response} res
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });
    const isValid = await user.validatePassword(password);
    if (!isValid) return res.status(400).json({ message: 'Invalid credentials.' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
