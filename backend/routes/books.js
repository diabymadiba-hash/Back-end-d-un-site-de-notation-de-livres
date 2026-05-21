const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// POST : créer un livre (protégé)
router.post('/', auth, (req, res, next) => {
  delete req.body._id;
  const book = new Book({ ...req.body });
  book.save()
    .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
    .catch(error => res.status(400).json({ error }));
});

// GET : récupérer tous les livres (public)
router.get('/', (req, res, next) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
});

// GET : récupérer un livre par ID (public)
router.get('/:id', (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
});

// PUT : modifier un livre (protégé)
router.put('/:id', auth, (req, res, next) => {
  Book.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Livre modifié !' }))
    .catch(error => res.status(400).json({ error }));
});

// DELETE : supprimer un livre (protégé)
router.delete('/:id', auth, (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
    .catch(error => res.status(400).json({ error }));
});

module.exports = router;
