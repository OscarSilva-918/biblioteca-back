const express = require('express');
const multer = require('multer');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

const upload = multer(); // almacenamiento en memoria

router.post('/', upload.single('imagen'), uploadController.uploadImage);

module.exports = router;
