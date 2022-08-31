const { Router } = require('express');
const AgendamentoController = require('../controllers/AgendamentoController');

const router = Router();

router.get('/agendamentos', AgendamentoController.listAll);
router.get('/agendamentos/:id', AgendamentoController.buscaByID);

module.exports = router;