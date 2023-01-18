const updatePostValidation = require('../validation/updatePost.validate.joi');

module.exports = function validateUpdatePost(req, res, next) {
  const { error } = updatePostValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  } 

  return next();
};