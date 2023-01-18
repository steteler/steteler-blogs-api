const categoryValidation = require('../validation/categories.validate.joi');

module.exports = function validateNewCategory(req, res, next) {
  const { error } = categoryValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return next();
};