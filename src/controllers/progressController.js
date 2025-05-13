exports.getUserProgress = (req, res) => {
  res.send("Retornando progresso do usuário...");
};

exports.getProgressByArticle = (req, res) => {
  res.send("Retornando progresso por artigo...");
};

exports.saveUserProgress = (req, res) => {
  res.send("Progresso salvo com sucesso.");
};
