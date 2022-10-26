const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas/all', PessoaController.buscaAll);
router.get('/pessoas', PessoaController.buscaAllAtivas);
router.get('/pessoas/deleted', PessoaController.buscaPessoasDeleted);
router.get('/pessoas/:id', PessoaController.buscaPessoaByID);
// router.get('/pessoas/:clienteId/confirmados/agendamentos', PessoaController.buscaAgendamentosClienteConfimados);
// router.get('/pessoas/:clienteId/pendente/agendamentos', PessoaController.buscaAgendamentosClientePendente);
// router.get('/pessoas/:clienteId/cancelado/agendamentos', PessoaController.buscaAgendamentosClienteCancelado);
// router.get('/pessoas/:clienteId/concluido/agendamentos', PessoaController.buscaAgendamentosClienteConcluido);
router.post('/pessoas', PessoaController.criarPessoa);
router.post('/pessoas/:id/restaura', PessoaController.restaurarPessoa);
router.put('/pessoas/:id', PessoaController.atualizarPessoa);
router.delete('/pessoas/:id', PessoaController.removerPessoa);

module.exports = router;