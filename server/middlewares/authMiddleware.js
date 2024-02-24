const jwt = require('jsonwebtoken'); 
require('dotenv').config(); // Load environment variables from .env file

const authenticate = (req, res, next) => { 
  // Check if the user is authenticated
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
    // Token is valid, proceed to the next middleware
    req.user = decoded; // Set the decoded user data to the request object 
    next();
  });
};

module.exports = authenticate;
