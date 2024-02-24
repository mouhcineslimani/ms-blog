const service = require("../services/authServiceImp"); 

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async signUp(req, res) {
    try { 
      await this.authService.signUp(req.body);
      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      res.status(error.code || 500).json({ success: false, message: error.message });
    }
  }
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const token = await this.authService.signIn(email, password);
      res.cookie('access_token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
      res.status(200).json({ success: true, token });
    } catch (error) {
      if (error.code === 'USER_NOT_FOUND') {
        res.status(404).json({ success: false, message: error.message });
      } else if (error.code === 'INVALID_CREDENTIALS') {
        res.status(401).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    }
  }
  
  async logout(req, res) {
    try {
      await this.authService.logout(req,res);
    } catch (error) { 
      res.status(error.code || 500).json({ success: false, message: error.message });
    }
  }

}

const controller = new AuthController(service);
module.exports = controller; 
