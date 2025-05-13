const express = require("express");
const router = express.Router();

// Exemplo de rota de usuário
router.get("/", (req, res) => {
  res.send("Rota de usuários funcionando!");
});

module.exports = router;
