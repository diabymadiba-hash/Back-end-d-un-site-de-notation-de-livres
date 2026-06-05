const express = require('express');//mporte Express pour pouvoir créer un routeur
const router = express.Router();//crée un routeur
const authCtrl = require('../controllers/auth');
const auth = require('../middleware/auth');


router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);//route pour l'inscription et la connexion des utilisateurs

module.exports = router;//importe le routeur 
 