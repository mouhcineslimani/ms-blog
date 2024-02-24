class ArticleDao {
    constructor() {
        if(new.target === ArticleDao){
            console.log('u must implemented it');
        }
    }

    createArticle(articleData) {}
    getAllArticles() {}
    getArticleById(articleId) {}
    updateArticle(articleId, updatedArticleData) {}
    deleteArticle(articleId) {}
}

module.exports = ArticleDao;
