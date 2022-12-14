// const database = require('../models')
const { PessoasServices } = require('../services');
const pessoasServices = new PessoasServices();

class PessoaController {

    static async buscaAllAtivas(req, res) {
        try {
            const pessoas = await pessoasServices.listAllAtivos({ order: [['nome', 'ASC']] });
            return res.status(200).json(pessoas);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async buscaAll(req, res) {
        try {
            const pessoas = await pessoasServices.listAll();
            return res.status(200).json(pessoas);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async buscaPessoasDeleted(req, res) {
        try {
            const pessoas = await pessoasServices.listDeleted();
            return res.status(200).json(pessoas);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async buscaPessoaByID(req, res) {
        const { id } = req.params
        try {
            const pessoa = await pessoasServices.buscaByID(Number(id));
            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async buscaAllAgendamentosCliente(req, res) {
        const { clienteId } = req.params
        try {
            const agendamentos = await pessoasServices.listAllAgendamentosCliente(clienteId);
            return res.status(200).json(agendamentos);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    // static async buscaAgendamentosClienteConfimados(req, res) {
    //     const { clienteId } = req.params;

    //     try {
    //         const agendamentosConfirmado = await database.Agendamentos.findAndCountAll(
    //             {
    //                 where: {
    //                     cliente_id: Number(clienteId),
    //                     status: 'confirmado'
    //                 },
    //                 order: [['data_agendamento', 'ASC']]
    //             });
    //         return res.status(200).json(agendamentosConfirmado);
    //     } catch (error) {
    //         return res.status(500).json(error.message)
    //     }
    // }

    // static async buscaAgendamentosClientePendente(req, res) {
    //     const { clienteId } = req.params;

    //     try {
    //         const cliente = await database.Pessoas.findAndCountAll({
    //             where: {
    //                 id: Number(clienteId)
    //             },
    //         })
    //         const agendamentosPendente = await cliente.getAgendamentosPendente();
    //         return res.status(200).json(agendamentosPendente);
    //     } catch (error) {
    //         return res.status(500).json(error.message)
    //     }
    // }

    // static async buscaAgendamentosClienteCancelado(req, res) {
    //     const { clienteId } = req.params;

    //     try {
    //         const cliente = await database.Pessoas.findAndCountAll({
    //             where: {
    //                 id: Number(clienteId)
    //             },
    //         })
    //         const agendamentosCancelado = await cliente.getAgendamentosCancelado();
    //         return res.status(200).json(agendamentosCancelado);
    //     } catch (error) {
    //         return res.status(500).json(error.message)
    //     }
    // }

    // static async buscaAgendamentosClienteConcluido(req, res) {
    //     const { clienteId } = req.params;

    //     try {
    //         const cliente = await database.Pessoas.findOne({
    //             where: {
    //                 id: Number(clienteId)
    //             },
    //         })
    //         const agendamentosConcluido = await cliente.getAgendamentosConcluido();
    //         return res.status(200).json(agendamentosConcluido);
    //     } catch (error) {
    //         return res.status(500).json(error.message)
    //     }
    // }

    static async criarPessoa(req, res) {
        const dadosPessoa = req.body;
        try {
            const pessoaCriada = await pessoasServices.createRegistro(dadosPessoa)
            return res.status(200).json(pessoaCriada);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

   

    static async atualizarPessoa(req, res) {
        const { id } = req.params;
        const dadosPessoa = req.body;
        try {
            await pessoasServices.updateRegistro(dadosPessoa, Number(id));
            const pessoaAtualizada = await pessoasServices.buscaByID(Number(id));
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

   

    static async removerPessoa(req, res) {
        const { id } = req.params;
        try {
            await pessoasServices.deletePessoa(Number(id));
            return res.status(200).json({ mensagem: `Registro ${id} removido com sucesso!` });

        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async restaurarPessoa(req, res) {
        const { id } = req.params;
        try {
            await pessoasServices.restauraPessoa(Number(id));
            return res.status(200).json({ mensagem: `Registro ${id} restaurado com sucesso!` });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

  

}

module.exports = PessoaController;