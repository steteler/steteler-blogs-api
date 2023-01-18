const express = require('express');
const { user } = require('../controllers/index');

const { 
  validateNewUser, 
  validateToken, 
} = require('../middlewares/index');

const userRouter = express.Router();

userRouter.post(
  '/',
  validateNewUser,
  user.createUser,
);

userRouter.get(
  '/',
  validateToken,
  user.getAll,
);

userRouter.get(
  '/:id',
  validateToken,
  user.getById,
);

userRouter.delete(
  '/me',
  validateToken,
  user.remove,
);

module.exports = userRouter;
