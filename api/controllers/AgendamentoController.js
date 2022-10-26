const { AgendamentoServices } = require('../services');
const agendamentoServices = new AgendamentoServices();
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
            const agendamentos = await agendamentoServices.listAll({ where, order: [['data_agendamento', 'ASC']] });
            return res.status(200).json(agendamentos);
        } catch(error) {
            res.status(500).send(error.message);
        }
    }

    static async listDeleted(req,res) {
        const { data_ini, data_fim } = req.query;
        const where = {};
        data_ini || data_fim ? where.data_agendamento = {} : null;
        data_ini ? where.data_agendamento[Op.gte] = data_ini : null;
        data_fim ? where.data_agendamento[Op.lte] = data_fim : null;
        try {
            const agendamentos = await agendamentoServices.listDeleted( { order: [['data_agendamento', 'ASC']] });
            return res.status(200).json(agendamentos);
        } catch(error) {
            res.status(500).send(error.message);
        }
    }

    static async buscaByID(req, res) {
        const { id } = req.params
        try {
            const agendamento = await agendamentoServices.buscaByID(Number(id));
            return res.status(200).json(agendamento);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async criarAgendamento(req, res) {
        const novoAgendamento = { ...req.body }
        console.log(novoAgendamento)
        try {
            const agendamentoCriado = await agendamentoServices.createRegistro(novoAgendamento)
            return res.status(200).json(agendamentoCriado);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
    static async atualizarAgendamento(req, res) {
        const { agendamentoId } = req.params;
        const dadosAgendamento = req.body;
        try {
            await agendamentoServices.updateRegistro(dadosAgendamento, Number(agendamentoId));
            const agendamentoAtualizada = await agendamentoServices.buscaByID(Number(agendamentoId));
            return res.status(200).json(agendamentoAtualizada);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async removerAgendamento(req, res) {
        const { agendamentoId } = req.params;
        try {
            await agendamentoServices.deleteAgendamento(Number(agendamentoId));
            return res.status(200).json({ mensagem: `Registro ${agendamentoId} removido com sucesso!` });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async restaurarAgendamento(req, res) {
        const { agendamentoId } = req.params;
        try {
            await agendamentoServices.restauraAgendamento(Number(agendamentoId));
            return res.status(200).json({ mensagem: `Registro ${agendamentoId} restaurado com sucesso!` });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
}

module.exports = AgendamentoController;