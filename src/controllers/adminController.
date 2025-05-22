const Article = require("../models/Article");
const User = require("../models/User"); // Para possíveis funcionalidades futuras

// Criar novo artigo (apenas admin)
exports.createArticle = async (req, res) => {
  try {
    const { title, fullText, blanks } = req.body;
    const createdBy = req.user.id;

    if (!title || !fullText || !blanks || !Array.isArray(blanks)) {
      return res.status(400).json({ message: "Please provide title, fullText, and an array of blanks." });
    }

    const newArticle = new Article({
      title,
      fullText,
      blanks,
      createdBy
    });

    await newArticle.save();
    res.status(201).json({ message: "Article created successfully", article: newArticle });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Server error while creating article." });
  }
};

// Buscar todos os artigos (admin)
exports.getAllArticlesAdmin = async (req, res) => {
  try {
    const articles = await Article.find().populate("createdBy", "username email");
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles for admin:", error);
    res.status(500).json({ message: "Server error while fetching articles." });
  }
};

// Buscar artigo por ID (admin)
exports.getArticleByIdAdmin = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate("createdBy", "username email");
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    console.error("Error fetching article by ID for admin:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid article ID format" });
    }
    res.status(500).json({ message: "Server error while fetching article." });
  }
};

// Atualizar artigo por ID (apenas admin)
exports.updateArticle = async (req, res) => {
  try {
    const { title, fullText, blanks } = req.body;
    const articleId = req.params.id;

    let article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.title = title || article.title;
    article.fullText = fullText || article.fullText;
    article.blanks = blanks || article.blanks;
    article.updatedAt = Date.now();

    const updatedArticle = await article.save();
    res.json({ message: "Article updated successfully", article: updatedArticle });
  } catch (error) {
    console.error("Error updating article:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid article ID format" });
    }
    res.status(500).json({ message: "Server error while updating article." });
  }
};

// Deletar artigo por ID (apenas admin)
exports.deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await article.deleteOne();
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid article ID format" });
    }
    res.status(500).json({ message: "Server error while deleting article." });
  }
};

// Endpoint opcional: Buscar tentativas de usuários
exports.getUserAttempts = async (req, res) => {
  // Supondo que exista um modelo Attempt
  // const Attempt = require('../models/Attempt');
  try {
    // const attempts = await Attempt.find().populate('userId', 'username email').populate('articleId', 'title');
    // res.json(attempts);
    res.json({ message: "User attempts endpoint - to be implemented if Attempt model exists" });
  } catch (error) {
    console.error("Error fetching user attempts:", error);
    res.status(500).json({ message: "Server error while fetching user attempts." });
  }
};
