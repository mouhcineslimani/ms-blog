const { Router } = require("express");
const commentController = require("../controllers/comment.controller.js"); 
const authenticate = require("../middlewares/authMiddleware.js");
const router = new Router();
 
router.post("", authenticate, commentController.createComment.bind(commentController));
router.get("", commentController.getAllComments.bind(commentController));
router.get("/:id", commentController.getCommentById.bind(commentController));
router.put("/:id", authenticate, commentController.updateComment.bind(commentController));
router.delete("/:id", authenticate, commentController.deleteComment.bind(commentController));

module.exports = router;
