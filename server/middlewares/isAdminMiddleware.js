const isAdmin = (req, res, next) => {
    // Check if the user is an admin
    if (req.user.type !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden: User is not an admin' });
    }
    // User is an admin, proceed to the next middleware
    next();
  };
  
  module.exports = isAdmin;
  