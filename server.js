require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto 3000');
});
