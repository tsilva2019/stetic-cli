const database = require('../models')

class AgendamentoController{

    static async listAll(req,res) {
        try {
            const agendamentos = await database.Agendamentos.findAll();
            return res.status(200).json(agendamentos);
        } catch(error) {
            res.status(500).send(error.message);
        }
    }

    static async buscaByID(req, res) {
        const { id } = req.params
        try {
            const agendamento = await database.Agendamentos.findOne({ where: { id: Number(id) }});
            return res.status(200).json(agendamento);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
}

module.exports = AgendamentoController;