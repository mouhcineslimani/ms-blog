const { DataTypes } = require('sequelize'); 
const Article = require('./article.model.js'); // Assuming you have defined Article model
const User = require('./user.model.js'); // Assuming you have defined User model
const database = require('../dao/db/database.js');

const Comment = database.getSequelize().define('Comment', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

// Define associations
Comment.belongsTo(Article, { foreignKey: 'articleId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = Comment;
