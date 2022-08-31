const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.listAll);
router.get('/pessoas/:id', PessoaController.buscaByID);
router.get('/pessoas/:clienteId/agendamentos/:agendamentoId', PessoaController.buscaAgendamentoCliente);
router.get('/pessoas/:clienteId/agendamentos', PessoaController.buscaAllAgendamentosCliente);
router.post('/pessoas', PessoaController.criarPessoa);
router.post('/pessoas/:id/restaura', PessoaController.restaurarPessoa);
router.post('/pessoas/:clienteId/agendamentos', PessoaController.criarAgendamento);
router.post('/pessoas/:clienteId/agendamentos/:agendamentoId/restaura', PessoaController.restaurarAgendamento);
router.put('/pessoas/:id', PessoaController.atualizarPessoa);
router.put('/pessoas/:clienteId/agendamentos/:agendamentoId', PessoaController.atualizarAgendamento);
router.delete('/pessoas/:id', PessoaController.removerPessoa);
router.delete('/pessoas/:clienteId/agendamentos/:agendamentoId', PessoaController.removerAgendamento);

module.exports = router;