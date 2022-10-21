const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas/all', PessoaController.buscaAll);
router.get('/pessoas', PessoaController.buscaAllAtivas);
router.get('/pessoas/deleted', PessoaController.buscaPessoasDeleted);
router.get('/pessoas/:id', PessoaController.buscaPessoaByID);
router.get('/pessoas/:clienteId/agendamentos', PessoaController.buscaAllAgendamentosCliente);
// router.get('/pessoas/:clienteId/confirmados/agendamentos', PessoaController.buscaAgendamentosClienteConfimados);
// router.get('/pessoas/:clienteId/pendente/agendamentos', PessoaController.buscaAgendamentosClientePendente);
// router.get('/pessoas/:clienteId/cancelado/agendamentos', PessoaController.buscaAgendamentosClienteCancelado);
// router.get('/pessoas/:clienteId/concluido/agendamentos', PessoaController.buscaAgendamentosClienteConcluido);
router.post('/pessoas', PessoaController.criarPessoa);
router.post('/pessoas/:id/restaura', PessoaController.restaurarPessoa);
router.post('/pessoas/:clienteId/agendamentos', PessoaController.criarAgendamento);
router.post('/pessoas/:clienteId/agendamentos/:agendamentoId/restaura', PessoaController.restaurarAgendamentoPessoa);
router.put('/pessoas/:id', PessoaController.atualizarPessoa);
router.put('/pessoas/:clienteId/agendamentos/:agendamentoId', PessoaController.atualizarAgendamento);
router.delete('/pessoas/:id', PessoaController.removerPessoa);
router.delete('/pessoas/:clienteId/agendamentos/:agendamentoId', PessoaController.removerAgendamentoPessoa);

module.exports = router;