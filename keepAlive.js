const db = require('./db');

// Ejecuta un "ping" cada cierto tiempo para evitar que Railway cierre la conexión
setInterval(() => {
  db.query('SELECT 1', (err) => {
    if (err) {
      console.error('❌ Error al hacer ping a la base de datos:', err.message);
    } else {
      console.log('✅ Ping a la base de datos exitoso');
    }
  });
}, 5 * 60 * 1000); // cada 5 minutos
