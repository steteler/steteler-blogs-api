const { User } = require('../models');

async function getUserByEmail(email) {
  try {
    const user = await User.findAll({ where: { email } });
    return user;
  } catch (e) {
    console.log(e);
  }
}

async function create(newUser) {
  try {
    const user = await User.create(newUser);
    return user;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function getAll() {
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return allUsers;
  } catch (e) {
    console.log(e);
  }
}

async function getById(id) {
  try {
    const [result] = await User.findAll({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function remove(id) {
  try {
    await User.destroy({ where: { id } });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getUserByEmail,
  create,
  getAll,
  getById,
  remove,
};