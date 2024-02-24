class CommentDao {
  constructor() {
    if (new.target === CommentDao) {
      throw new Error(
        'Abstract class "CommentDao" cannot be instantiated directly.'
      );
    }
  }

  async createComment(userId, articleId, content) {}

  async getAllComments(articleId) {}

  async getCommentById(commentId) {}

  async updateComment(commentId, content) {}

  async deleteComment(commentId) {}
}

module.exports = CommentDao;
