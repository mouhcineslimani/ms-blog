const { DataTypes } = require('sequelize'); 
const database = require('../dao/db/database.js'); 

const User = database.getSequelize().define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('normal', 'admin'),
        allowNull: false,
        defaultValue: 'normal'
    }
});

module.exports = User;
