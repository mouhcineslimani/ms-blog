const CustomError = require("../../exceptions/customError");
const UserDao = require("../userDao");
const database = require("../db/database")

class UserDaoMysql extends UserDao {
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

  async getUserById(userId) { 
    try {
      const user = await this.sequelize.models.User.findByPk(userId);
      if (!user) { 
        return { success: false, data: null, message: 'User not found' };
      }
      const userData = { ...user.toJSON() }; // Create a copy of the user object
      delete userData.password; // Remove the password field from the copy
      return { success: true, data: userData, message: 'User found' };
    } catch (error) {
      throw new CustomError('DATABASE_ERROR', 'Error fetching user', 500);
    }
  }

  async getUsers() {
    try {
      const users = await this.sequelize.models.User.findAll();
      const userData = users.map(user => {
        const userCopy = { ...user.toJSON() }; // Create a copy of the user object
        delete userCopy.password; // Remove the password field from the copy
        return userCopy;
      });
      return { success: true, data: userData, message: 'Users fetched successfully' };  
    } catch (error) {
      throw new CustomError('DATABASE_ERROR', 'Error fetching users', 500);
    }
  }

  async updateUser(userId, updatedUserData) {
    try {
      const user = await this.getUserById(userId);
      if (!user.success) {
        return user; // Return the error response if user is not found
      }
      await user.data.update(updatedUserData);
      return { success: true, data: await this.getUserById(userId), message: 'User updated successfully' };
    } catch (error) {
      throw new CustomError('DATABASE_ERROR', 'Error updating user', 500);
    }
  }

  async deleteUser(userId) {
    try {
      const user = await this.getUserById(userId);
      if (!user.success) {
        return user; // Return the error response if user is not found
      }
      await user.data.destroy();
      return { success: true, data: null, message: 'User deleted successfully' };
    } catch (error) {
      throw new CustomError('DATABASE_ERROR', 'Error deleting user', 500);
    }
  }
}

module.exports = new UserDaoMysql(database.getSequelize());
