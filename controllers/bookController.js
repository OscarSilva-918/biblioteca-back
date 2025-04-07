const db = require('../db');

exports.getAllBooks = (req, res) => {
  console.log('📚 Llegó la petición GET /api/books');
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.addBook = (req, res) => {
  const { title, author } = req.body;
  db.query('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Libro agregado');
  });
};

exports.updateBook = (req, res) => {
  const { title, author } = req.body;
  db.query('UPDATE books SET title = ?, author = ? WHERE id = ?', [title, author, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Libro actualizado');
  });
};

exports.deleteBook = (req, res) => {
  db.query('DELETE FROM books WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Libro eliminado');
  });
};

exports.reserveBook = (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.id;
  db.query('INSERT INTO reservations (user_id, book_id, reserved_at) VALUES (?, ?, NOW())', [userId, bookId], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Reserva realizada');
  });
};
