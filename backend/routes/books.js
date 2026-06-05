const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middleware/auth');            
const imageProcessor = require('../middleware/imageProcessor'); // Multer et Sharp fusionné

// Controllers
const booksCtrl = require('../controllers/books');

// Récupérer tous les livres
router.get('/', booksCtrl.getAllBooks);

// Top 3 meilleurs livres
router.get('/bestrating', booksCtrl.getBestRatingBooks);

// Récupérer un livre par ID
router.get('/:id', booksCtrl.getOneBook);

// Créer un livre (auth + upload + optimisation)
router.post('/', auth, imageProcessor, booksCtrl.createBook);

// Modifier un livre (auth + upload + optimisation)
router.put('/:id', auth, imageProcessor, booksCtrl.updateBook);

// Supprimer un livre
router.delete('/:id', auth, booksCtrl.deleteBook);

// Noter un livre
router.post('/:id/rating', auth, booksCtrl.rateBook);

module.exports = router;
