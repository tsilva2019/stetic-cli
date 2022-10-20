// const database = require('../models')
const Services = require('../services/Services')
const pessoasServices = new Services('Pessoas')

class PessoaController{

    static async listAllAtivas(req,res) {
        try {
            const pessoas = await pessoasServices.listAll({ order: [['nome', 'ASC']] });
            return res.status(200).json(pessoas);
        } catch(error) {
            res.status(500).send(error.message);
        }
    }

    static async listAll(req,res) {
        try {
            const pessoas = await database.Pessoas.scope('all').findAndCountAll({ paranoid: false }, { order: [['nome', 'ASC']] });
            return res.status(200).json(pessoas);
        } catch(error) {
            res.status(500).send(error.message);
        }
    }

    static async listDeleted(req,res) {
        try {
            const pessoas = await database.Pessoas.scope('deleted').findAndCountAll({ paranoid: false }, { order: [['nome', 'ASC']] });
            return res.status(200).json(pessoas);
        } catch(error) {
            res.status(500).send(error.message);
        }
    }

    static async buscaByID(req, res) {
        const { id } = req.params
        try {
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(id) }});
            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async buscaAgendamentoCliente(req, res) {
        const { clienteId, agendamentoId } = req.params;
        try {
            const agendamento = await database.Agendamentos.findOne(
                { 
                    where: {
                         id: Number(agendamentoId),
                         cliente_id: Number(clienteId)
                        }});
            return res.status(200).json(agendamento);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async buscaAgendamentosConfimados(req, res) {
        const { clienteId } = req.params;

        try {
            const agendamentosConfirmado = await database.Agendamentos.findAndCountAll(
                { 
                    where: {
                         cliente_id: Number(clienteId),
                         status: 'confirmado'
                        },
                        order: [['data_agendamento', 'ASC']]
                    });
            return res.status(200).json(agendamentosConfirmado);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async buscaAgendamentosPendente(req, res) {
        const { clienteId } = req.params;

        try {
            const cliente = await database.Pessoas.findAndCountAll({
                where: {
                    id: Number(clienteId)
                },
            })
            const agendamentosPendente = await cliente.getAgendamentosPendente();
            return res.status(200).json(agendamentosPendente);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async buscaAgendamentosCancelado(req, res) {
        const { clienteId } = req.params;

        try {
            const cliente = await database.Pessoas.findAndCountAll({
                where: {
                    id: Number(clienteId)
                },
            })
            const agendamentosCancelado = await cliente.getAgendamentosCancelado();
            return res.status(200).json(agendamentosCancelado);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async buscaAgendamentosConcluido(req, res) {
        const { clienteId } = req.params;

        try {
            const cliente = await database.Pessoas.findOne({
                where: {
                    id: Number(clienteId)
                },
            })
            const agendamentosConcluido = await cliente.getAgendamentosConcluido();
            return res.status(200).json(agendamentosConcluido);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async buscaAllAgendamentosCliente(req, res) {
        const { clienteId } = req.params
        try {
            const agendamentos = await database.Agendamentos.findAndCountAll(
                { 
                    where: {
                         cliente_id: Number(clienteId)
                        },
                        order: [['data_agendamento', 'ASC']]
                    });
            return res.status(200).json(agendamentos);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async criarPessoa(req, res) {
        const dadosPessoa = req.body;
        try {
            const pessoaCriada = await database.Pessoas.create(dadosPessoa)
            return res.status(200).json(pessoaCriada);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async criarAgendamento(req, res) {
        const { clienteId } = req.params;
        const novoAgendamento = { ...req.body, cliente_id: Number(clienteId) }
        console.log(novoAgendamento)
        try {
            const agendamentoCriado = await database.Agendamentos.create(novoAgendamento)
            return res.status(200).json(agendamentoCriado);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async atualizarPessoa(req, res) {
        const { id } = req.params;
        const dadosPessoa = req.body;
        try {
            await database.Pessoas.scope('all').update(dadosPessoa, { where: { id: Number(id) }});
            const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) }});
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).send(error.message);
        } 
    }

    static async atualizarAgendamento(req, res) {
        const { clienteId, agendamentoId } = req.params;
        const dadosAgendamento = req.body;
        try {
            await database.Agendamentos.update(dadosAgendamento, { 
                where: {
                 id: Number(agendamentoId),
                cliente_id: Number(clienteId) 
            }});
            const agendamentoAtualizada = await database.Agendamentos.findOne({ where: { id: Number(agendamentoId) }});
            return res.status(200).json(agendamentoAtualizada);
        } catch (error) {
            return res.status(500).send(error.message);
        } 
    }

    static async removerPessoa(req, res) {
        const { id } = req.params;
        const statusRemovido = {
            status: 'removido'
        }
        const ativoFalse =  {
            "ativo": "false"
        }

        try {
            database.sequelize.transaction(async (trRemovePessoa) => {
            await database.Pessoas.scope('all').update(ativoFalse, { where: { id: Number(id) }});
            await database.Pessoas.scope('all').destroy({ where: { id: Number(id) }}, { transaction: trRemovePessoa });
            
            await database.Agendamentos.update(statusRemovido, { where: { cliente_id: Number(id) }}, { transaction: trRemovePessoa });
            await database.Agendamentos.destroy({ where: { cliente_id: Number(id) }}, { transaction: trRemovePessoa });
            return res.status(200).json({ mensagem: `Registro ${id} removido com sucesso!` });
            })
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async restaurarPessoa(req, res) {
        const { id } = req.params;
        const ativoTrue =  {
            "ativo": "true"
        }

        try {
            await database.Pessoas.scope('all').update(ativoTrue, { paranoid: false }, { where: { id: Number(id) }});
            await database.Pessoas.scope('all').restore({ where: { id: Number(id) }});
            return res.status(200).json({ mensagem: `Registro ${id} restaurado com sucesso!` });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async removerAgendamento(req, res) {
        const { clienteId, agendamentoId } = req.params;
        try {
            await database.Agendamentos.destroy(
                { 
                    where: { 
                        id: Number(agendamentoId),
                        cliente_id: Number(clienteId) 
                    }
                });
            return res.status(200).json({ mensagem: `Registro ${agendamentoId} removido com sucesso!` });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async restaurarAgendamento(req, res) {
        const { clienteId, agendamentoId } = req.params;
        try {
            await database.Agendamentos.restore(
                { 
                    where: { 
                        id: Number(agendamentoId),
                        cliente_id: Number(clienteId) 
                    }
                });
            return res.status(200).json({ mensagem: `Registro ${agendamentoId} restaurado com sucesso!` });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

}

module.exports = PessoaController;