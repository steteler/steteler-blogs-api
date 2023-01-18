const jwt = require('jsonwebtoken');
const { login } = require('../services/index');

const { JWT_SECRET } = process.env;

const INVALID_FIELDS = 'Invalid fields';

async function getLogin(req, res) {
  try {
    const { email, password } = req.body;

    const userFound = await login.getLogin({ email, password });

    if (!userFound) {
      return res.status(400).json({ message: INVALID_FIELDS });
    }

    delete userFound.dataValues.password;

    const token = jwt.sign({ ...userFound.dataValues }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({ token });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getLogin,
};