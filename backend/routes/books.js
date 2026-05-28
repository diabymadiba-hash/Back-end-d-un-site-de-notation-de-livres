const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const booksCtrl = require('../controllers/books');

// ROUTES CRUD
router.get('/', booksCtrl.getAllBooks);
router.get('/bestrating', booksCtrl.getBestRatingBooks);
router.get('/:id', booksCtrl.getOneBook);
router.post('/', auth, multer, booksCtrl.createBook);
router.put('/:id', auth, multer, booksCtrl.updateBook);
router.delete('/:id', auth, booksCtrl.deleteBook);

// ROUTE NOTATION
router.post('/:id/rating', auth, booksCtrl.rateBook);

module.exports = router;
