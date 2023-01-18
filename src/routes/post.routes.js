const express = require('express');
const { post } = require('../controllers/index');

const { 
  validatePostContent,
  validateCategoryById,
  validateToken,
  validateUpdatePost,
} = require('../middlewares/index');

const postRouter = express.Router();

postRouter.post(
  '/',
  validateToken,
  validatePostContent,
  validateCategoryById,
  post.createPost,
);

postRouter.get(
  '/',
  validateToken,
  post.getAll,
);

postRouter.get(
  '/search/',
  validateToken,
  post.search,
);

postRouter.get(
  '/:id',
  validateToken,
  post.getById,
);

postRouter.put(
  '/:id',
  validateToken,
  validateUpdatePost,
  post.update,
);

postRouter.delete(
  '/:id',
  validateToken,
  post.remove,
);

module.exports = postRouter;
