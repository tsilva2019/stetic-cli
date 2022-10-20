const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas/all', PessoaController.listAll);
router.get('/pessoas', PessoaController.listAllAtivas);
router.get('/pessoas/deleted', PessoaController.listDeleted);
router.get('/pessoas/:id', PessoaController.buscaByID);
router.get('/pessoas/:clienteId/agendamentos/:agendamentoId', PessoaController.buscaAgendamentoCliente);
router.get('/pessoas/:clienteId/agendamentos', PessoaController.buscaAllAgendamentosCliente);
router.get('/pessoas/:clienteId/confirmados/agendamentos', PessoaController.buscaAgendamentosConfimados);
router.get('/pessoas/:clienteId/pendente/agendamentos', PessoaController.buscaAgendamentosPendente);
router.get('/pessoas/:clienteId/cancelado/agendamentos', PessoaController.buscaAgendamentosCancelado);
router.get('/pessoas/:clienteId/concluido/agendamentos', PessoaController.buscaAgendamentosConcluido);
router.post('/pessoas', PessoaController.criarPessoa);
router.post('/pessoas/:id/restaura', PessoaController.restaurarPessoa);
router.post('/pessoas/:clienteId/agendamentos', PessoaController.criarAgendamento);
router.post('/pessoas/:clienteId/agendamentos/:agendamentoId/restaura', PessoaController.restaurarAgendamentoPessoa);
router.put('/pessoas/:id', PessoaController.atualizarPessoa);
router.put('/pessoas/:clienteId/agendamentos/:agendamentoId', PessoaController.atualizarAgendamento);
router.delete('/pessoas/:id', PessoaController.removerPessoa);
router.delete('/pessoas/:clienteId/agendamentos/:agendamentoId', PessoaController.removerAgendamentoPessoa);

module.exports = router;