const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({/* Schéma de données pour les livres */
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [
    {
      userId: { type: String, required: true },/* ID de l'utilisateur qui a évalué */
      grade: { type: Number, required: true }/* Note donnée par l'utilisateur, de 1 à 5 */
    }
  ],
 averageRating: { type: Number, required: false, default: 0 }// moyenne des notes, calculée à chaque nouvelle évaluation
});

module.exports = mongoose.model('Book', bookSchema);//export-controller-routes
