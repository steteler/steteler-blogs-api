const validateLogin = require('./login.middleware');
const validateNewUser = require('./newUser.middleware');
const validateToken = require('./token.middleware');
const validateNewCategory = require('./newCategory.middleware');
const validateCategoryById = require('./categoryId.middleware');
const validatePostContent = require('./postContent.middleware');
const validateUpdatePost = require('./updatePost.middleware');

module.exports = {
  validateLogin,
  validateNewUser,
  validateToken,
  validateNewCategory,
  validateCategoryById,
  validatePostContent,
  validateUpdatePost,
};