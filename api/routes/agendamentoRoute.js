const { Router } = require('express');
const AgendamentoController = require('../controllers/AgendamentoController');

const router = Router();

router.get('/agendamentos', AgendamentoController.listAll);
router.get('/agendamentos/deleted', AgendamentoController.listDeleted);
router.get('/agendamentos/:id', AgendamentoController.buscaByID);
router.post('/agendamentos', AgendamentoController.criarAgendamento);
router.post('/agendamentos/:agendamentoId/restaura', AgendamentoController.restaurarAgendamento);
router.put('/agendamentos/:agendamentoId', AgendamentoController.atualizarAgendamento);
router.delete('/agendamentos/:agendamentoId', AgendamentoController.removerAgendamento);
module.exports = router;