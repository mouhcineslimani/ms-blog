const database = require("../db/database");
const ArticleDao = require("../articleDao.js"); 

class ArticleDaoMysql extends ArticleDao {
    constructor(sequelize) {
        super(); 
        this.sequelize = sequelize;
      }

    async createArticle(articleData) {
        try {
            // admin is responsable to create an article
            const user = await this.sequelize.models.User.findByPk(articleData.userId);
            if (!user || user.type !== "admin") { 
              return { success: false, data: null, message: 'User cannot create an article' };
            }
            const createdArrticle = await this.sequelize.models.Article.create({...articleData,user});
            return { success: true, data: createdArrticle, message: 'Article created successfully' };
          } catch (error) {
            throw new CustomError('DATABASE_ERROR', 'Error creating user', 500);
          }
    }

    async getAllArticles() {
        try {
            const articles = await this.sequelize.models.Article.findAll();
            return { success: true, data: articles, message: 'Articles fetched successfully' };
        } catch (error) {
            throw new CustomError('DATABASE_ERROR', 'Error fetching articles', 500);
        }
    }

    async getArticleById(articleId) {
        try {
            const article = await this.sequelize.models.Article.findByPk(articleId);
            if (!article) {
                throw new CustomError('NOT_FOUND', 'Article not found', 404);
            }
            return { success: true, data: article, message: 'Article found' };
        } catch (error) {
            throw new CustomError('DATABASE_ERROR', 'Error fetching article', 500);
        }
    }

    async updateArticle(articleId, updatedArticleData) {
        try {
            const article = await this.getArticleById(articleId);
            if (!article) {
                throw new CustomError('NOT_FOUND', 'Article not found', 404);
            }
            await article.update(updatedArticleData);
            return { success: true, data: article, message: 'Article updated successfully' };
        } catch (error) {
            throw new CustomError('DATABASE_ERROR', 'Error updating article', 500);
        }
    }

    async deleteArticle(articleId) {
        try {
            const article = await this.getArticleById(articleId);
            if (!article) {
                throw new CustomError('NOT_FOUND', 'Article not found', 404);
            }
            await article.destroy();
            return { success: true, message: 'Article deleted successfully' };
        } catch (error) {
            throw new CustomError('DATABASE_ERROR', 'Error deleting article', 500);
        }
    }
}

module.exports = new ArticleDaoMysql(database.getSequelize());
