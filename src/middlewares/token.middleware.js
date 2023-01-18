const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = async function validateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};