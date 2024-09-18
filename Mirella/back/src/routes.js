const express = require('express');

const router = express.Router();

const Usuario = require('./controllers/usuarios');
const Alimentacao = require('./controllers/alimentacao');
const Treino = require('./controllers/treino');

router.get('/', (req, res) => {
    res.send('Hello World').end();
});

router.post('/login', Usuario.login);
router.post('/usuario', Usuario.create);
router.get('/usuario', Usuario.read);
router.put('/usuario/:id', Usuario.update)
router.delete('/usuario/:id', Usuario.delet)

router.get('/alimentacao', Alimentacao.readAlimentacao);
router.post('/alimentacao', Alimentacao.createAlimentacao);
router.put('/alimentacao/:id',  Alimentacao.updateAlimentacao);
router.delete('/alimentacao/:id',  Alimentacao.deleteAlimentacao);

router.get('/treino', Treino.readTreino);
router.post('/treino', Treino.createTreino);
router.put('/treino/:id',  Treino.updateTreino);
router.delete('/treino/:id',  Treino.deleteTreino);

module.exports = router 