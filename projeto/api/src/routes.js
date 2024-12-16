const express = require('express');

const router = express.Router();

const login = require('./controllers/usuario');
const UsuarioController = require('./controllers/usuario');

router.get('/', (req, res) => {
    res.send('Hello World').end();
});

//Clientes
router.post('/login', UsuarioController.criarUsuario.create);
router.get('/clientes', clientes.read);
router.delete('/clientes/:id', clientes.remove);
router.put('/clientes/:id', clientes.update);

router.get('/cliente/:id', clientes.readById);
router.post('/clientes/nome', clientes.readByName);


module.exports = router;