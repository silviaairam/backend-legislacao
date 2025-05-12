const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  getPremiumExerciseById
} = require("../controllers/exerciseController"); // crie ou mova essa função para este controller

router.get("/:articleId", authMiddleware, getPremiumExerciseById);

module.exports = router;
