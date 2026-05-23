const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');          // vérifie le token
const multer = require('../middleware/multer-config'); // gère l'image uploadée

// POST : créer un livre (protégé + image)
router.post('/', auth, multer, (req, res, next) => {
  const bookObject = JSON.parse(req.body.book); // données envoyées en JSON
  delete bookObject._id; // sécurité : on enlève l'id envoyé par le front

  const book = new Book({
    ...bookObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // URL finale de l'image
  });

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

// PUT : modifier un livre (protégé + image optionnelle)
router.put('/:id', auth, multer, (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book), // si nouvelle image → JSON
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    : { ...req.body }; // sinon → données simples

  Book.updateOne(
    { _id: req.params.id },
    { ...bookObject, _id: req.params.id } // on force l'id correct
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
