const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fullText: { type: String, required: true },
  blanks: [{ type: String, required: true }]
});

module.exports = mongoose.model("Article", articleSchema);
