const userDao = require("../dao/mysql/userDaoMysql");
const articleDao = require("../dao/mysql/articleDaoMysql");
const commentDao = require("../dao/mysql/commentDaoMysql");
const BlogService = require("./blogService");
const bcrypt = require("bcrypt");

class BlogServiceImp extends BlogService {
  constructor(dao) { 
    super();
    this.userDao = dao.userDao;
    this.articleDao= dao.articleDao;
    this.commentDao = dao.commentDao;
  }

  async createUser(user) {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the salt rounds
    return this.userDao.createUser({ ...user, password: hashedPassword });
  }

  getUserById(userId) {
    return this.userDao.getUserById(userId);
  }

  getUsers() {
    return this.userDao.getUsers();
  }

  updateUser(userId, updatedUserData) {
    return this.userDao.updateUser(userId, updatedUserData);
  }

  deleteUser(userId) {
    return this.userDao.deleteUser(userId);
  }

  async createArticle(articleData) {
    return this.articleDao.createArticle(articleData);
  }

  async getAllArticles() {
    return this.articleDao.getAllArticles();
  }

  async getArticleById(articleId) {
    return this.articleDao.getArticleById(articleId);
  }

  async updateArticle(articleId, updatedArticleData) {
    return this.articleDao.updateArticle(articleId,updatedArticleData);
  }

  async deleteArticle(articleId) {
    return this.articleDao.deleteArticle(articleId);
  }


  async createComment(userId, articleId, content) {
    return this.commentDao.createComment(userId, articleId, content);
  }

  async getAllComments(articleId) { 
    return this.commentDao.getAllComments(articleId);
  }

  async getCommentById(commentId) {
    return this.commentDao.getCommentById(commentId);
  }

  async updateComment(commentId, content) {
    return this.commentDao.updateComment(commentId, content);
  }

  async deleteComment(commentId) {
    return this.commentDao.deleteComment(commentId);
  }

}

const dao = {
  userDao,articleDao,commentDao
};

const service = new BlogServiceImp(dao);

module.exports = service;
