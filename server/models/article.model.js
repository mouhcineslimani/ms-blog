const { DataTypes } = require("sequelize");
const User = require("./user.model.js"); // Assuming you have defined User model
const database = require("../dao/db/database.js");

const Article = database.getSequelize().define("Article", {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Define association
Article.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = Article;
