const { User } = require('../models');

async function getLogin({ email, password }) {
  try {
    const user = await User.findOne({ where: { email, password } });
    return user;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getLogin,
};