const express = require('express');
const { postRegistrar, postLogin, getRegistrar, getLogin , getDashboard} = require('../controllers/auth');
const router = express.Router();

// Rutas para registro y login de usuarios
router.route('/register') // http://localhost:4500/auth/register
    .get(getRegistrar)
    .post(postRegistrar);

router.route('/login') // http://localhost:4500/auth/login
    .get(getLogin)
    .post(postLogin);

// Ruta para el dashboard
router.route('/dashboard')
.get(getDashboard) 

module.exports = router;
