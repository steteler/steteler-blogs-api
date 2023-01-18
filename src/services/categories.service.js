const { Category } = require('../models');

async function create(name) {
  try {
    const newCategory = await Category.create({ name });
    return newCategory;
  } catch (e) {
    console.log(e);
  }
}

async function getAllCategories() {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (e) {
    console.log(e);
  }
}

async function getCategoryById(id) {
  try {
    const categoryById = await Category.findByPk(id);
    return categoryById;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  create,
  getAllCategories,
  getCategoryById,
};