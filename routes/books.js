const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
// const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', bookController.getAllBooks);
// router.post('/', verifyToken, isAdmin, bookController.addBook);
router.post('/', bookController.addBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id',  bookController.deleteBook);
router.post('/reserve/:id', bookController.reserveBook);

module.exports = router;
