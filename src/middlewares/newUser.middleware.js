const userValidate = require('../validation/user.validate.joi');

module.exports = function validateNewUser(req, res, next) {
  const { error } = userValidate.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return next();
};