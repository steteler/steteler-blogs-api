const express = require('express');
const { login } = require('../controllers/index');
const { validateLogin } = require('../middlewares/index');

const loginRouter = express.Router();

loginRouter.post(
  '/',
  validateLogin,
  login.getLogin,
);

module.exports = loginRouter;
