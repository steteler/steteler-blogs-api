const { categories } = require('../services');

module.exports = async function validateCategoryById(req, res, next) {
  const { categoryIds } = req.body;

  const allCategories = categoryIds.map(async (category) => {
    const categoryFound = await categories.getCategoryById(category);
    return categoryFound;
  });

  const listCategories = await Promise.all(allCategories);

  const error = listCategories.some((categorie) => categorie === null);

  if (error) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  return next();
};