function authMiddleware(req, res, next) {
  // Aqui você pode validar o token ou autenticação
  console.log("Middleware de autenticação ativado");
  next();
}

module.exports = authMiddleware;
