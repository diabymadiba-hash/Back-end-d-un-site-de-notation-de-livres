const jwt = require('jsonwebtoken');//import pour vérifie les tokens//

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_SECRET_KEY');//verifie si le token et valide//
    req.auth = { userId: decodedToken.userId };//qui fait la requete//
    next();
  } catch {
    res.status(401).json({ message: 'Requête non authentifiée !' });
  }
};
