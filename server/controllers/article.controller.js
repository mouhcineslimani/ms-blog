const service = require("../services/blogServiceImp");

class ArticleController {
    constructor(service) {
        this.service = service;
    }

    async createArticle(req, res) { 
        try {
            const article = await this.service.createArticle(req.body);
            res.status(201).json(article);
        } catch (error) {
            res.status(error.code || 500).json({ success: false, message: error.message });
        }
    }

    async getAllArticles(req, res) { 
        try {
            const articles = await this.service.getAllArticles();
            res.status(200).json(articles);
        } catch (error) {
            res.status(error.code || 500).json({ success: false, message: error.message });
        }
    }

    async getArticleById(req, res) {
        try {
            const articleId = req.params.id;
            const article = await this.service.getArticleById(articleId);
            if (article) {
                res.status(200).json(article);
            } else {
                res.status(404).json({ success: false, message: 'Article not found' });
            }
        } catch (error) {
            res.status(error.code || 500).json({ success: false, message: error.message });
        }
    }

    async updateArticle(req, res) {
        try {
            const articleId = req.params.id;
            const updatedArticle = await this.service.updateArticle(articleId, req.body);
            res.status(200).json(updatedArticle);
        } catch (error) {
            res.status(error.code || 500).json({ success: false, message: error.message });
        }
    }

    async deleteArticle(req, res) {
        try {
            const articleId = req.params.id;
            const result = await this.service.deleteArticle(articleId);
            res.status(200).json(result);
        } catch (error) {
            res.status(error.code || 500).json({ success: false, message: error.message });
        }
    }
}

const controller = new ArticleController(service);
module.exports = controller;
