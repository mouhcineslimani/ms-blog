const { Router } = require("express");
const articleController = require("../controllers/article.controller.js"); 
const router = new Router();

router.get('', articleController.getAllArticles.bind(articleController));
router.post("", articleController.createArticle.bind(articleController));
router.get("/:id", articleController.getArticleById.bind(articleController));
router.put("/:id", articleController.updateArticle.bind(articleController));
router.delete("/:id", articleController.deleteArticle.bind(articleController));

module.exports = router;
