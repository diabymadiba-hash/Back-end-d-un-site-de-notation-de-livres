// Importation des modules nécessaires
const express = require('express'); 
const mongoose = require('mongoose');
const path = require('path');

// Importation des routes
const booksRoutes = require('./routes/books');
const authRoutes = require('./routes/auth'); 

// Création de l'application Express
const app = express();

// Middleware pour lire le JSON dans les requêtes
app.use(express.json());

/* ---------------------------------------------------------
    CORS : Autorise le frontend (localhost:3001) à appeler
   le backend (localhost:3000)
--------------------------------------------------------- */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

/* ---------------------------------------------------------
    Connexion à MongoDB
--------------------------------------------------------- */
mongoose.connect('mongodb+srv://Madiba5010485e:Madiba1234@cluster0.so6l7qn.mongodb.net/livres?appName=Cluster0')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* ---------------------------------------------------------
   Routes d'authentification (inscription / connexion)
--------------------------------------------------------- */
app.use('/api/auth', authRoutes);

/* ---------------------------------------------------------
    Routes des livres (CRUD)
--------------------------------------------------------- */
app.use('/api/books', booksRoutes);

/* ---------------------------------------------------------
    Route statique pour servir les images
--------------------------------------------------------- */
app.use('/images', express.static(path.join(__dirname, 'images')));

// Exportation de l'application
module.exports = app;
