const express = require("express");
const router = express.Router();

// Exemplo de rota admin
router.get("/", (req, res) => {
  res.send("Rota admin funcionando!");
});

module.exports = router;
