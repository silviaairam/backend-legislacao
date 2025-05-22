const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const progressRoutes = require("./routes/progress.routes");
const userRoutes = require("./routes/user");
// Importe outras rotas se necessário, ex: premiumContentRoutes

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/premium", premiumContentRoutes); // Se existir

// Rota básica para teste
app.get("/", (req, res) => {
  res.send("API rodando!");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });
