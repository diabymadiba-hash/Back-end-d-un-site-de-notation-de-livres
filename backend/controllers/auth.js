const bcrypt = require('bcrypt');//hasher les mots de passe//
const jwt = require('jsonwebtoken');//créer des tokens d'authentification//
const User = require('../models/User');

exports.signup = (req, res, next) => {//hashage du mot de passe avant de le sauvegarder dans la base de données//
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({//on crée un nouvel utilisateur avec le mot de passe hashé//
        email: req.body.email,
        password: hash
      });
      user.save()//enregistre dans la basse de données//
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));//erreur serveur//
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })//pas d'émail impossible de se connecter//
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé !' });//si aucun utilisateur trouvé,erreur 401//
      }
      bcrypt.compare(req.body.password, user.password)//on compare les mots de passe//
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: 'Mot de passe incorrect !' });
          }
          res.status(200).json({//si il est bon, on envoie id + token//
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_SECRET_KEY',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));//erreur serveur//
    })
    .catch(error => res.status(500).json({ error }));
};
