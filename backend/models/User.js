const mongoose = require('mongoose');

const userSchema = mongoose.Schema({// schéma de données pour les utilisateurs
  email: { type: String, required: true, unique: true },// l'email doit être unique pour chaque utilisateur
  password: { type: String, required: true }// le mot de passe est requis
});

module.exports = mongoose.model('User', userSchema);
