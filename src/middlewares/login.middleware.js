const MISSING_FIELDS = 'Some required fields are missing';

module.exports = function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: MISSING_FIELDS });
  }

  return next();
};