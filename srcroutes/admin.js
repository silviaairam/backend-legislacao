const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const {
  createArticle,
  getAllArticlesAdmin,
  getArticleByIdAdmin,
  updateArticle,
  deleteArticle,
  getUserAttempts
} = require("../controllers/adminController");

router.post("/articles", authMiddleware, adminMiddleware, createArticle);
router.get("/articles", authMiddleware, adminMiddleware, getAllArticlesAdmin);
router.get("/articles/:id", authMiddleware, adminMiddleware, getArticleByIdAdmin);
router.put("/articles/:id", authMiddleware, adminMiddleware, updateArticle);
router.delete("/articles/:id", authMiddleware, adminMiddleware, deleteArticle);

router.get("/attempts", authMiddleware, adminMiddleware, getUserAttempts); // opcional

module.exports = router;
