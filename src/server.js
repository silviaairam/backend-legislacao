const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/admin");
const progressRoutes = require("./routes/progressRoutes");
const premiumRoutes = require("./routes/premiumContentRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Conecta ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user/progress", progressRoutes);
app.use("/api/exercises/premium", premiumRoutes);

// Rota de teste
app.get("/", (req, res) => {
    res.send("Servidor backend rodando! 🚀");
});

// Inicializa o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
