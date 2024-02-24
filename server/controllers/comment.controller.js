const service = require("../services/blogServiceImp");

class CommentController {
    constructor(service) {
        this.service = service;
    }

    async createComment(req, res) {
        try {
            const { userId } = req.user;
            const { content } = req.body;
            const articleId = req.params.articleId;

            const comment = await this.service.createComment(userId, articleId, content);
            res.status(201).json({ success: true, data: comment, message: 'Comment created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async getAllComments(req, res) { 
        try {
            const articleId = req.params.articleId;
            const comments = await this.service.getAllComments(articleId);
            res.status(200).json({ success: true, data: comments, message: 'All comments fetched successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async getCommentById(req, res) {
        try {
            const commentId = req.params.id;

            const comment = await this.service.getCommentById(commentId);
            res.status(200).json({ success: true, data: comment, message: `Comment with ID ${commentId} fetched successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async updateComment(req, res) {
        try {
            const commentId = req.params.id;
            const { content } = req.body;

            const updatedComment = await this.service.updateComment(commentId, content);
            res.status(200).json({ success: true, data: updatedComment, message: `Comment with ID ${commentId} updated successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async deleteComment(req, res) {
        try {
            const commentId = req.params.id;

            await this.service.deleteComment(commentId);
            res.status(200).json({ success: true, message: `Comment with ID ${commentId} deleted successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}
const controller = new CommentController(service);
module.exports = controller;
