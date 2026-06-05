const Book = require('../models/Book');// Importation du modèle de données Book
const fs = require('fs');

/* CREATE — Ajouter un livre */
exports.createBook = (req, res) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;// Supprimer l'ID généré par le client
  delete bookObject._userId;

  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,// Associer le livre à l'utilisateur authentifié
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// Construire l'URL de l'image à partir du nom de fichier
  });

  book.save()
    .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
    .catch(error => res.status(400).json({ error }));//evite que le server se plante
};

/* READ — Tous les livres */
exports.getAllBooks = (req, res) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

/* READ — Un livre */
exports.getOneBook = (req, res) => {
  Book.findOne({ _id: req.params.id })// Trouver un livre par son ID
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
};

/* UPDATE — Modifier un livre */
exports.updateBook = (req, res) => {
  const bookObject = req.file//reconstruire un nouvel objet livre + nouvelle image
    ? {
      ...JSON.parse(req.body.book),// Récupérer les données du livre à partir de la requête
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// Construire l'URL de la nouvelle image
    }
    : { ...req.body };

  delete bookObject._userId;

  Book.findOne({ _id: req.params.id })
    .then(book => {
      if (book.userId != req.auth.userId) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      Book.updateOne(
        { _id: req.params.id },// Trouver le livre à mettre à jour
        { ...bookObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: 'Livre modifié !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

/* DELETE — Supprimer un livre */
exports.deleteBook = (req, res) => {
  Book.findOne({ _id: req.params.id })// Trouver le livre à supprimer
    .then(book => {// Vérifier que le livre appartient à l'utilisateur authentifié
      if (book.userId != req.auth.userId) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const filename = book.imageUrl.split('/images/')[1];// Extraire le nom de fichier de l'URL de l'image

      fs.unlink(`images/${filename}`, () => {
        Book.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

/* RATE — Noter un livre */
exports.rateBook = (req, res) => {
  const userId = req.auth.userId;//on envoie l'id de l'utilisateur qui note le livre
  const grade = req.body.rating;

  Book.findOne({ _id: req.params.id })// Trouver le livre à noter
    .then(book => {
      const alreadyRated = book.ratings.find(r => r.userId === userId);// Vérifier si l'utilisateur a déjà noté ce livre
      if (alreadyRated) {
        return res.status(400).json({ message: 'Vous avez déjà noté ce livre.' });
      }
      // Ajout de la nouvelle note
      book.ratings.push({ userId, grade });
      // Recalcul de la moyenne
      const total = book.ratings.reduce((acc, r) => acc + r.grade, 0);
      book.averageRating = total / book.ratings.length;
      // Sauvegarde du livre mis à jour
      book.save()
        .then(() => res.status(200).json(book))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
};

/* BEST — Top 3 meilleurs livres */
exports.getBestRatingBooks = (req, res) => {
  // Tri par note moyenne + limite à 3 résultats
  Book.find().sort({ averageRating: -1 }).limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};
