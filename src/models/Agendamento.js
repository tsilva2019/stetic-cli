import mongoose from "mongoose";

const agendamentoSchema = new mongoose.Schema(
    {
        dataAgendamento: { type: String, required: true },
        horaAgendamento: { type: String, required: true},
        usuario: { type: mongoose.SchemaTypes.ObjectId, ref:'usuarios', required: true}
    }
);

const agendamentos = mongoose.model("agendamentos", agendamentoSchema);

export default agendamentos;