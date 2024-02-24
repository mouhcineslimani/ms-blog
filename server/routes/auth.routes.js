const { Router } = require("express");
const authController = require("../controllers/auth.controler.js");
const authenticate = require("../middlewares/authMiddleware.js");
const isAdmin = require("../middlewares/isAdminMiddleware.js");
const router = new Router();

router.post("/sign-up", authController.signUp.bind(authController));
router.post("/sign-in", authController.signIn.bind(authController));
router.get("/logout", authenticate ,authController.logout.bind(authController));

// Route that requires authentication
router.get("/profile", authenticate, (req, res) => {
  res.json({
    success: true,
    message: "User profile retrieved successfully",
    user: req.user,
  });
});
// Route that requires admin privileges
router.get(
  "/admin/dashboard",
  authenticate,
  isAdmin,
  (req,res)=>{
    res.json({
        success: true,
        message: "Admin profile retrieved successfully",
        user: req.user,
      });
  }
);

module.exports = router;
