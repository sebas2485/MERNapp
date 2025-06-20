const { User } = require('../config/db');

exports.findUserByEmail = (email) => User.findOne({ where: { email } });
exports.createUser = (data) => User.create(data);
exports.findUserById = (id) => User.findByPk(id);
exports.updateUser = async (id, updates) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  return user.update(updates);
};