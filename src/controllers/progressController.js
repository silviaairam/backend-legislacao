const Progress = require("../models/Progress");
const Article = require("../models/Article");

// Criar ou atualizar progresso do usuário em um artigo
exports.saveProgress = async (req, res) => {
  try {
    const { articleId, answers, score, completed } = req.body;
    const userId = req.user.id;

    if (!articleId || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Article ID and answers are required." });
    }

    // Busca o artigo para pegar as respostas corretas
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found." });
    }

    // Calcula score se não for enviado
    let finalScore = score;
    if (typeof finalScore !== "number") {
      let correct = 0;
      for (let i = 0; i < article.blanks.length; i++) {
        if (answers[i] && answers[i].trim().toLowerCase() === article.blanks[i].trim().toLowerCase()) {
          correct++;
        }
      }
      finalScore = correct;
    }

    // Busca ou cria progresso
    let progress = await Progress.findOne({ user: userId, article: articleId });

    const attempt = {
      timestamp: new Date(),
      answers,
      correctAnswers: article.blanks,
      scoreForAttempt: finalScore
    };

    if (progress) {
      progress.completed = completed || false;
      progress.score = finalScore;
      progress.lastAttemptDate = new Date();
      progress.attempts.push(attempt);
      await progress.save();
    } else {
      progress = new Progress({
        user: userId,
        article: articleId,
        completed: completed || false,
        score: finalScore,
        lastAttemptDate: new Date(),
        attempts: [attempt]
      });
      await progress.save();
    }

    res.status(200).json({ message: "Progress saved successfully.", progress });
  } catch (error) {
    console.error("Error saving progress:", error);
    res.status(500).json({ message: "Server error while saving progress." });
  }
};

// Buscar progresso do usuário para um artigo
exports.getUserProgress = async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.user.id;

    const progress = await Progress.findOne({ user: userId, article: articleId });
    if (!progress) {
      return res.status(404).json({ message: "No progress found for this article." });
    }
    res.json(progress);
  } catch (error) {
    console.error("Error getting user progress:", error);
    res.status(500).json({ message: "Server error while getting progress." });
  }
};

// Buscar todos os progressos de um usuário (opcional)
exports.getAllUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const progresses = await Progress.find({ user: userId }).populate("article", "title");
    res.json(progresses);
  } catch (error) {
    console.error("Error getting all user progress:", error);
    res.status(500).json({ message: "Server error while getting all progress." });
  }
};

