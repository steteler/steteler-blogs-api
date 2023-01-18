const express = require('express');
const { categories } = require('../controllers/index');

const { 
  validateToken,
  validateNewCategory,
} = require('../middlewares/index');

const categoriesRouter = express.Router();

categoriesRouter.post(
  '/',
  validateToken,
  validateNewCategory,
  categories.createNewCategory,
);

categoriesRouter.get(
  '/',
  validateToken,
  categories.getAllCategories,
);

module.exports = categoriesRouter;
