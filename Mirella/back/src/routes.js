const express = require('express');

const router = express.Router();

const usuarios = require('./controllers/usuarios');
// const alimentacao = require('./controllers/alimentacao');
// const treino = require('./controllers/treino');

router.get('/', (req, res) => {
    res.send('Hello World').end();
});

module.exports = router 