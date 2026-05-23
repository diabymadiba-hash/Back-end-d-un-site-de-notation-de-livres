const Book = require('../models/Book');//import modèle donnée Mongoose//

// CREATE
exports.createBook = (req, res, next) => {/*export une fonction*/
  const book = new Book({/*crée un nouveau document book*/
    ...req.body/*on reupere les données par le front-end*/
  });

  book.save()
    .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

// READ ALL
exports.getAllBooks = (req, res, next) => {/*recherche tous les livres dans la base de données*/
  Book.find()/*recupere tous le document(collection books)*/
    .then(books => res.status(200).json(books))/*on envoie la liste*/
    .catch(error => res.status(400).json({ error }));
};

// READ ONE
exports.getOneBook = (req, res, next) => {/*recherche via l'id*/
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
};

// UPDATE
exports.updateBook = (req, res, next) => {
  Book.updateOne(
    { _id: req.params.id },/* je charche le livre a modifier*/
    { ...req.body, _id: req.params.id }
  )
  /*message de succès ou d'érreur*/
    .then(() => res.status(200).json({ message: 'Livre modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

// DELETE
exports.deleteBook = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })/* on cherche le livre a supprimer*/
    .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};
