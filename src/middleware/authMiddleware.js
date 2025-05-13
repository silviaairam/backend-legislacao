function authMiddleware(req, res, next) {
  // Aqui você pode validar o token de autenticação no futuro
  console.log("Middleware de autenticação ativado");
  next();
}

module.exports = authMiddleware;
