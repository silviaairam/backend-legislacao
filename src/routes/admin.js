const express = require("express");
const router = express.Router();

const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const adminController = require("../controller/adminController");

// Criar artigo (apenas admin)
router.post("/articles", authMiddleware, adminMiddleware, adminController.createArticle);

// Atualizar artigo (apenas admin)
router.put("/articles/:id", authMiddleware, adminMiddleware, adminController.updateArticle);

// Deletar artigo (apenas admin)
router.delete("/articles/:id", authMiddleware, adminMiddleware, adminController.deleteArticle);

// Listar todos os artigos (admin)
router.get("/articles", authMiddleware, adminMiddleware, adminController.getAllArticlesAdmin);

// Buscar artigo por ID (admin)
router.get("/articles/:id", authMiddleware, adminMiddleware, adminController.getArticleByIdAdmin);

// Buscar tentativas de usuários (opcional, admin)
router.get("/attempts", authMiddleware, adminMiddleware, adminController.getUserAttempts);

module.exports = router;
