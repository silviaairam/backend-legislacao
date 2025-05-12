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
        answers: [String], // Store the user's answers for this attempt
        correctAnswers: [String], // Store the correct answers for the blanks
        scoreForAttempt: Number
    }]
}, { timestamps: true });

// Ensure a user can only have one progress document per article
ProgressSchema.index({ user: 1, article: 1 }, { unique: true });

module.exports = mongoose.model("Progress", ProgressSchema);
