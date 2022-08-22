import express from "express";
import usuarioController from "../controllers/usuariosController.js";

const router = express.Router();

router
.get('/usuarios', usuarioController.listarUsuarios)
.get('/usuarios/:id', usuarioController.listarByID)
.post('/usuarios', usuarioController.cadastrarUsuario)
.put('/usuarios/:id', usuarioController.atualizarUsuario)
.delete('/usuarios/:id', usuarioController.removerUsuario)

export default router;