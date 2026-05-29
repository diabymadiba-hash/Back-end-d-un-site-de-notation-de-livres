const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middleware/auth');            // Vérifie le token
const multer = require('../middleware/multer-config'); // Upload image
const sharpMiddleware = require('../middleware/sharp-config'); // Compression image

// Controllers
const booksCtrl = require('../controllers/books');

// Récupérer tous les livres
router.get('/', booksCtrl.getAllBooks);

// Top 3 meilleurs livres
router.get('/bestrating', booksCtrl.getBestRatingBooks);

// Récupérer un livre par ID
router.get('/:id', booksCtrl.getOneBook);

// Créer un livre (auth + upload + compression)
router.post('/', auth, multer, sharpMiddleware, booksCtrl.createBook);

// Modifier un livre (auth + upload + compression)
router.put('/:id', auth, multer, sharpMiddleware, booksCtrl.updateBook);

// Supprimer un livre
router.delete('/:id', auth, booksCtrl.deleteBook);

// Noter un livre (une seule fois par utilisateur)
router.post('/:id/rating', auth, booksCtrl.rateBook);

module.exports = router;
