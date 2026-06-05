const bcrypt = require('bcrypt');//hasher les mots de passe//
const jwt = require('jsonwebtoken');//créer des tokens d'authentification//
const User = require('../models/User');//importer le modèle utilisateur//

exports.signup = (req, res, next) => {// Fonction appelée quand un utilisateur s’inscrit//
  bcrypt.hash(req.body.password, 10)//salt,securité du hash
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
// Fonction appelée quand un utilisateur se connecte//
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })//vérifie si l'utilisateur existe//
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
             process.env.TOKEN_SECRET,//Encoder le token//
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));//erreur serveur//
    })
    .catch(error => res.status(500).json({ error }));
};
