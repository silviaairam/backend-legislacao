const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  getUserProgress,
  getProgressByArticle,
  saveUserProgress
} = require("../controllers/progressController"); // crie esse controller se ainda não tiver

router.get("/", authMiddleware, getUserProgress);
router.get("/:articleId", authMiddleware, getProgressByArticle);
router.post("/:articleId", authMiddleware, saveUserProgress);

module.exports = router;
