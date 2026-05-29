const multer = require('multer');
const path = require('path');

// Dictionnaire des extensions acceptées
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // dossier où stocker les images
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Export du middleware
module.exports = multer({ storage }).single('image');
