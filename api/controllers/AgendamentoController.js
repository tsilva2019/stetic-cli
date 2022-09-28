const database = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class AgendamentoController{

    static async listAll(req,res) {
        const { data_ini, data_fim } = req.query;
        const where = {};
        data_ini || data_fim ? where.data_agendamento = {} : null;
        data_ini ? where.data_agendamento[Op.gte] = data_ini : null;
        data_fim ? where.data_agendamento[Op.lte] = data_fim : null;
        try {
            const agendamentos = await database.Agendamentos.findAndCountAll({ where, order: [['data_agendamento', 'ASC']] });
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