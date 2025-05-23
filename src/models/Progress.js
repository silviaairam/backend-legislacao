const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0
  },
  lastAttemptDate: {
    type: Date,
    default: Date.now
  },
  attempts: [{
    timestamp: { type: Date, default: Date.now },
    answers: [String],
    correctAnswers: [String],
    scoreForAttempt: Number
  }]
}, { timestamps: true });

// Garante um progresso único por usuário/artigo
ProgressSchema.index({ user: 1, article: 1 }, { unique: true });

module.exports = mongoose.model("Progress", ProgressSchema);
