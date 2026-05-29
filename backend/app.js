require('dotenv').config();

// Importation des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

// Importation des routes
const booksRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');

// Création de l'application Express
const app = express();

// Sécurité Helmet
app.use(helmet({ crossOriginResourcePolicy: false }));

// Middleware pour lire le JSON dans les requêtes
app.use(express.json());

// CORS propre
app.use(cors());

/* ---------------------------------------------------------
   Connexion à MongoDB
--------------------------------------------------------- */
mongoose.connect(process.env.MONGO_URI)
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
