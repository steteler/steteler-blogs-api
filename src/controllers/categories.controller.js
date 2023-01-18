const { categories } = require('../services');

async function createNewCategory(req, res) {
  try {
    const { name } = req.body;

    const newCategory = await categories.create(name);

    return res.status(201).json(newCategory);
  } catch (e) {
    console.log(e);
  }
}

async function getAllCategories(_req, res) {
  try {
    const allCategories = await categories.getAllCategories();

    return res.status(200).json(allCategories);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  createNewCategory,
  getAllCategories,
};