const postValidation = require('../validation/post.validate.joi');

module.exports = function validatePostContent(req, res, next) {
  const { error } = postValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return next();
};