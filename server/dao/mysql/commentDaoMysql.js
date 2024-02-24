const database = require('../db/database');
const CommentDao = require('../commentDao.js');
const CustomError = require('../../exceptions/customError.js');

class CommentDaoMysql extends CommentDao {
  constructor(sequelize) {
    super();
    this.sequelize = sequelize;
  }

  async createComment(userId, articleId, content) {
    try {
      const comment = await this.sequelize.models.Comment.create({
        userId: userId,
        articleId: articleId,
        content: content
      });
      return { success: true, data: comment, message: 'Comment created successfully' };
    } catch (error) {
      throw new CustomError('DATABASE_ERROR', 'Error creating comment', 500);
    }
  }

  async getAllComments(articleId) {
    try {
      const comments = await this.sequelize.models.Comment.findAll({ where: { articleId: articleId } });
      return { success: true, data: comments, message: 'All comments fetched successfully' };
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw new CustomError('DATABASE_ERROR', 'Error fetching comments: ' + error.message, 500);
    }
  }
  

  async getCommentById(commentId) {
    try {
      const comment = await this.sequelize.models.Comment.findByPk(commentId);
      if (!comment) {
        return { success: false, data: null, message: 'Comment not found' };
      }
      return { success: true, data: comment, message: 'Comment found' };
    } catch (error) {
      throw new CustomError('DATABASE_ERROR', 'Error fetching comment', 500);
    }
  }

  async updateComment(commentId, content) {
    try {
      const updatedComment = await this.sequelize.models.Comment.update(
        { content: content },
        { where: { id: commentId } }
      );
      if (updatedComment[0] === 0) {
        return { success: false, data: null, message: 'Comment not found' };
      }
      return { success: true, data: updatedComment, message: 'Comment updated successfully' };
    } catch (error) {
      throw new CustomError('DATABASE_ERROR', 'Error updating comment', 500);
    }
  }

  async deleteComment(commentId) {
    try {
      const deletedComment = await this.sequelize.models.Comment.destroy({ where: { id: commentId } });
      if (!deletedComment) {
        return { success: false, data: null, message: 'Comment not found' };
      }
      return { success: true, message: 'Comment deleted successfully' };
    } catch (error) {
      throw new CustomError('DATABASE_ERROR', 'Error deleting comment', 500);
    }
  }
}

module.exports = new CommentDaoMysql(database.getSequelize());
