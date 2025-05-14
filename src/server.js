const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
// Adicione outras rotas conforme forem criadas
// const progressRoutes = require('./routes/progressRoutes');
// const premiumContentRoutes = require('./routes/premiumContentRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/users', userRoutes);
// app.use('/api/progress', progressRoutes);
// app.use('/api/premium', premiumContentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(Servidor rodando na porta ${PORT});
});
