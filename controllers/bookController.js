const db = require('../db');

exports.getAllBooks = (req, res) => {
  console.log('📚 Llegó la petición GET /api/books');
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('❌ Error en la consulta a la base de datos:', err);
      return res.status(500).json({ message: 'Error en la base de datos', error: err });
    }
    res.json(results);
  });
};

exports.addBook = (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Título y autor son obligatorios' });
  }

  db.query('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], (err) => {
    if (err) return res.status(500).json({ message: 'Error al agregar libro', error: err });
    res.send('Libro agregado');
  });
};

exports.updateBook = (req, res) => {
  const { title, author } = req.body;
  db.query('UPDATE books SET title = ?, author = ? WHERE id = ?', [title, author, req.params.id], (err) => {
    if (err) return res.status(500).json({ message: 'Error al actualizar libro', error: err });
    res.send('Libro actualizado');
  });
};

exports.deleteBook = (req, res) => {
  db.query('DELETE FROM books WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: 'Error al eliminar libro', error: err });
    res.send('Libro eliminado');
  });
};

exports.reserveBook = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const userId = req.user.id;
  const bookId = req.params.id;

  db.query(
    'INSERT INTO reservations (user_id, book_id, reserved_at) VALUES (?, ?, NOW())',
    [userId, bookId],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error al reservar libro', error: err });
      res.send('Reserva realizada');
    }
  );
};
