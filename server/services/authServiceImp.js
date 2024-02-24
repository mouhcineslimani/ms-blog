const authDaoMysql = require("../dao/mysql/authDaoMysql");
const CustomError = require("../exceptions/customError");
const AuthService = require("./authService");
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthServiceImp extends AuthService {
  constructor(authDao) {
    super();
    this.authDao = authDao;
  }

  async signUp(user) { 
    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    // Create new user
    await this.authDao.createUser({...user, password: hashedPassword});
  }

  async signIn(email, password) {
    const user = await this.authDao.getUserByEmail(email); 
    if (!user) { 
      throw new CustomError('USER_NOT_FOUND', 'User not found', 404);
    }  
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new CustomError('INVALID_CREDENTIALS', 'Invalid email or password', 401);
    }

    const userData = { ...user.toJSON() }; // Create a copy of the user object
    delete userData.password; // Remove the password field from the copy

    // Generate JWT token
    const token = jwt.sign({ ...userData }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;
  }

  async logout(req, res) { 
    try {
      // Retrieve the access_token from cookies
      const token = req.cookies.access_token;
    
      if (!token) {
        throw new CustomError('INVALID_TOKEN', 'No access token provided', 401);
      }
      // Verify the token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      // Clear the access_token from cookies
      res.clearCookie('access_token');
      return res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) { 
      // Handle any errors that occur during the logout process
      return res.status(error.code || 500).json({ success: false, message: error.message });
    }
  }
  
  
} 

module.exports = new AuthServiceImp(authDaoMysql);
