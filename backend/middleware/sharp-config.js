const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const inputPath = req.file.path; // image originale
  const outputFilename = req.file.filename.split('.')[0] + '.webp';
  const outputPath = path.join('images', outputFilename);

  try {
    await sharp(inputPath)
      .resize(500) // largeur max 500px
      .webp({ quality: 80 }) // compression propre
      .toFile(outputPath);

    // Supprimer l'image originale
    fs.unlinkSync(inputPath);

    // Mettre à jour req.file pour la suite
    req.file.filename = outputFilename;
    req.file.path = outputPath;

    next();
  } catch (error) {
    console.error('Erreur Sharp :', error);
    next(error);
  }
};
