const express = require('express');

const router = express.Router();

const Usuario = require('./controllers/usuarios');
const Middleware = require('./middleware/auth')
// const alimentacao = require('./controllers/alimentacao');
// const treino = require('./controllers/treino');

router.get('/', (req, res) => {
    res.send('Hello World').end();
});

router.post('/login',Middleware.validaAcesso, Usuario.login);
router.post('/registro', Usuario.create);
router.get('/usuario', Middleware.validaAcesso, Usuario.read);
router.get('/usuario/:matricula', Middleware.validaAcesso, Usuario.read);


module.exports = router 