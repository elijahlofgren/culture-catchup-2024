const jwt = require('jsonwebtoken');

// JWT verification middleware
module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res
      .status(403)
      .send({ message: 'A token is required for authentication' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ message: 'Invalid Token' });
  }

  return next();
};
