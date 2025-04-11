const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

exports.uploadImage = (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'libros' },
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error al subir la imagen' });
        }

        res.json({ url: result.secure_url });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error inesperado al subir la imagen' });
  }
};
