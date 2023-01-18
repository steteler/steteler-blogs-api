const jwt = require('jsonwebtoken');
const { user } = require('../services');

const { JWT_SECRET } = process.env;

async function createUser(req, res) {
  try {
    const { email } = req.body;

    const userFound = await user.getUserByEmail(email);

    if (userFound.length) {
      return res.status(409).json({ message: 'User already registered' });
    }

    const createdUser = await user.create(req.body);

    const token = jwt.sign(createdUser.dataValues, JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e);
  }
}

async function getAll(_req, res) {
  try {
    const users = await user.getAll();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const userById = await user.getById(id);

    if (!userById) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    return res.status(200).json(userById);
  } catch (e) {
    console.log(e);
  }
}

async function remove(req, res) {
  try {
    const { id } = req.user;

    await user.remove(id);

    return res.status(204).end();
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  createUser,
  getAll,
  getById,
  remove,
};