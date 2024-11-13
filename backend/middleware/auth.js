const jwt = require('jsonwebtoken');
const User = require('../models/user');

const IsAuth = async (req, res, next) => {
  console.log('Cookies:', req.cookies); // Debugging line
  const token = req.cookies.AudCastToken;

  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const secretKey = process.env.TOKEN_SECRET; // Use TOKEN_SECRET
    if (!secretKey) {
      throw new Error('Secret key is not defined in environment variables');
    }

    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded token:', decoded); // Debugging line
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error('Token verification error:', error); // Detailed error logging
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = IsAuth;