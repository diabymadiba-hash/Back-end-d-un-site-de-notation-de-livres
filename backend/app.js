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
const seedRoutes = require('./routes/seed');

// Création de l'application Express
const app = express();

// Sécurité Helmet
app.use(helmet({ crossOriginResourcePolicy: false }));

// Middleware pour lire le JSON dans les requêtes
app.use(express.json());

// CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      origin === 'https://back-end-d-un-site-de-notation-de-livres-chfudawvt-diabymadiba.vercel.app' ||
      /\.vercel\.app$/.test(origin) ||
      origin === 'http://localhost:3000' ||
      origin === 'http://localhost:3001'
    ) {
      return callback(null, true);
    }
    callback(new Error(`CORS bloqué pour l'origine : ${origin}`));
  },
  credentials: true,
}));

/* ---------------------------------------------------------
   Connexion à MongoDB
--------------------------------------------------------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => { console.error('Connexion à MongoDB échouée !', err.message); process.exit(1); });

/* ---------------------------------------------------------
   Routes d'authentification (inscription / connexion)
--------------------------------------------------------- */
app.use('/api/auth', authRoutes);

/* ---------------------------------------------------------
   Routes des livres (CRUD)
--------------------------------------------------------- */
app.use('/api/books', booksRoutes);

/* ---------------------------------------------------------
   Route de seed temporaire — À SUPPRIMER en production
--------------------------------------------------------- */
app.use('/api/seed', seedRoutes);

/* ---------------------------------------------------------
   Route statique pour servir les images
--------------------------------------------------------- */
app.use('/images', express.static(path.join(__dirname, 'images')));

// Exportation de l'application
module.exports = app;
