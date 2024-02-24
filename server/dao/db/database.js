const { Sequelize, DataTypes } = require('sequelize');

class Database {
  constructor(database, username, password, options = {}) {
    // Create a new Sequelize instance with the connection information to your MySQL database
    this.sequelize = new Sequelize(database, username, password, {
      ...options,
      dialect: 'mysql',
    });
  }

  async authenticate() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  async close() {
    try {
      await this.sequelize.close();
      console.log('Database connection closed successfully.');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }

  async syncModels() {
    try {
      // Synchronize models with the database for the first time
      await this.sequelize.sync();
      console.log('Models synchronized with the database successfully.');
    } catch (error) {
      console.error('Unable to sync models with the database:', error);
    }
  }

  getSequelize(){
    return this.sequelize;
  }
}

const database = new Database('blogDB', 'root', 'root', {
    host: 'localhost', 
    logging: false, // Disable logging of SQL queries (you can set it to true for debugging)
    define: {
        timestamps: true, // Add createdAt and updatedAt timestamps to all models by default
    }
  });

module.exports = database;
