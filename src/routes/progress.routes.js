const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const progressController = require("../controllers/progressController");

// Salvar ou atualizar progresso de um usuário em um artigo
router.post("/save", authMiddleware, progressController.saveProgress);

// Buscar progresso do usuário para um artigo específico
router.get("/:articleId", authMiddleware, progressController.getUserProgress);

// Buscar todos os progressos do usuário (opcional)
router.get("/", authMiddleware, progressController.getAllUserProgress);

module.exports = router;
