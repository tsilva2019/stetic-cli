import express from "express";
import agendamentoController from "../controllers/agendamentoController.js";

const router = express.Router();

router
.get('/agendamentos', agendamentoController.listarAgendamentos)
.get('/agendamentos/busca', agendamentoController.listarByUsuario)
.get('/agendamentos/:id', agendamentoController.listarByID)
.post('/agendamentos', agendamentoController.cadastrarAgendamento)
.put('/agendamentos/:id', agendamentoController.atualizarAgendamento)
.delete('/agendamentos/:id', agendamentoController.removerAgendamento)

export default router;