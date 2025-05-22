const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");

// Exemplo de rota de conteúdo premium
router.get("/", authMiddleware, (req, res) => {
  // Aqui você pode implementar a lógica para checar se o usuário é premium,
  // ou simplesmente liberar o conteúdo exclusivo para usuários autenticados.
  res.json({
    message: "Bem-vindo ao conteúdo premium!",
    user: req.user
  });
});

// Exemplo de rota para um conteúdo premium específico
router.get("/video/:id", authMiddleware, (req, res) => {
  // Lógica para buscar e retornar o vídeo premium com base no ID
  res.json({
    message: `Conteúdo premium do vídeo ${req.params.id}`,
    user: req.user
  });
});

module.exports = router;
