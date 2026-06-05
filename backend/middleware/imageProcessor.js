const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');//import pour le traitement d'images//

// Multer : stockage en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

module.exports = (req, res, next) => {
  upload(req, res, async (err) => {// Traite l'upload
    if (err) return next(err);

    // Si aucune image → on passe au controller
    if (!req.file) return next();

    try {
      const outputDir = 'images'; // destination pour les images traitées

      // Crée le dossier s'il n'existe pas
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Nettoyage du nom
      const baseName = req.file.originalname
        .toLowerCase()
        .replace(/\s+/g, '_')
        .split('.')[0];

      // Nom final en .webp
      const fileName = `${baseName}_${Date.now()}.webp`;
      const outputPath = path.join(outputDir, fileName);// Chemin complet pour enregistrer l'image

      // Conversion Sharp
      await sharp(req.file.buffer)
        .resize(500) // largeur max
        .webp({ quality: 80 }) // compression propre
        .toFile(outputPath);

      // Mise à jour pour le controller
      req.file.filename = fileName;
      req.file.path = outputPath;

      next();
    } catch (error) {
      console.error('Erreur Sharp :', error);
      next(error);
    }
  });
};
