require('dotenv').config();
const cors = require('cors')
const uploadRoutes = require('./routes/upload');
const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const db = require('./db');

app.use(cors())

const envPath = process.env.NODE_ENV === 'production' 
  ? path.resolve(__dirname, '.env.production') 
  : path.resolve(__dirname, '.env');

  require('dotenv').config({ path: envPath });

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);


app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto 3000');
});
