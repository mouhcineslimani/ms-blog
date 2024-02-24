class BlogService {
  constructor() {
    if (new.target === BlogService) {
      console.log("You must implement this class");
    }
  }
  createUser(user) {}
  getUserById(userId) {}
  getUsers() {}
  updateUser(userId, updatedUserData) {}
  deleteUser(userId) {}

  createArticle(articleData) {}
  getAllArticles() {}
  getArticleById(articleId) {}
  updateArticle(articleId, updatedArticleData) {}
  deleteArticle(articleId) {}

  createComment(userId, articleId, content) {}
  getAllComments(articleId) {}
  getCommentById(commentId) {}
  updateComment(commentId, content) {}
  deleteComment(commentId) {}
}

module.exports = BlogService;
