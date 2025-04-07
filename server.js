require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');

// Carga el archivo .env dependiendo del entorno
const envPath = process.env.NODE_ENV === 'production' 
  ? path.resolve(__dirname, '.env.production') 
  : path.resolve(__dirname, '.env');

require('dotenv').config({ path: envPath });

app.get('/ping', (req, res) => {
  db.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error', details: err.message });
    res.status(200).json({ message: 'pong 🏓', dbTest: results[0].result });
  });
});


const PORT = process.env.PORT || 3000;
app.use(express.json());

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto 3000');
});
