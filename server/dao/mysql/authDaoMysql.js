const CustomError = require("../../exceptions/customError");
const User = require("../../models/user.model");
const AuthDao = require("../authDao");
const database = require("../db/database");

 

class AuthDaoMysql extends AuthDao {
    constructor(sequelize) {
        super();
        this.sequelize = sequelize;
    }

  async createUser(user) {
    try {
        const createdUser = await this.sequelize.models.User.create(user);
        return { success: true, data: createdUser, message: 'User created successfully' };
      } catch (error) {
        throw new CustomError('DATABASE_ERROR', 'Error creating user', 500);
      }
  }

  async getUserByEmail(email) {
    try { 
      return await this.sequelize.models.User.findOne({ where: { email } });
    } catch (error) {
      throw new CustomError('DATABASE_ERROR', 'Error fetching user', 500);
    }
  }
}

module.exports = new AuthDaoMysql(database.getSequelize());
