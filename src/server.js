const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const premiumContentRoutes = require('./routes/premiumContentRoutes');
const progressRoutes = require('./routes/progressRoutes');

// Configura variáveis de ambiente
dotenv.config();

// Conecta ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Inicializa o app
const app = express();
app.use(cors());
app.use(express.json());

// Usa as rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', premiumContentRoutes);
app.use('/api/progress', progressRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta ${PORT}');
});
