const express = require('express'); // Importation d'Express pour créer le serveur
const mongoose = require('mongoose');

const booksRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');   

const app = express();
app.use(express.json()); //permet de lire le json//

// Connexion MongoDB
mongoose.connect('mongodb+srv://Madiba5010485e:Madiba1234@cluster0.so6l7qn.mongodb.net/livres?appName=Cluster0')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//  ROUTES AUTH (toujours avant les routes protégées)
app.use('/api/auth', authRoutes);

//  ROUTES BOOKS
app.use('/api/books', booksRoutes);

module.exports = app;
