const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', bookController.getAllBooks);
router.post('/', verifyToken, isAdmin, bookController.addBook);
router.put('/:id', verifyToken, isAdmin, bookController.updateBook);
router.delete('/:id', verifyToken, isAdmin, bookController.deleteBook);
router.post('/reserve/:id', verifyToken, bookController.reserveBook);

module.exports = router;
