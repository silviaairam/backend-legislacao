const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const User = require("../models/User");

// Buscar perfil do usuário autenticado
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching user profile." });
  }
});

// (Opcional) Listar todos os usuários - apenas para admin
// Descomente se quiser permitir que apenas admins vejam todos os usuários
/*
const { adminMiddleware } = require("../middleware/authMiddleware");

router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching users." });
  }
});
*/

module.exports = router;
