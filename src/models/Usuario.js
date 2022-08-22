import mongoose from "mongoose";


const  usuarioSchema = new mongoose.Schema(
  {
    nome: {type: String, required:true},
    email: {type: String, required:true},
    telefone: {type: String, required:true},
    senha: {type: String, required:true},
    timestamps: {
      type: mongoose.SchemaTypes.Date,
      default: Date.now,
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em',
    }
  });

const usuarios = mongoose.model('usuarios',usuarioSchema);


export default usuarios;