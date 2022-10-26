const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor() {
        super('Pessoas')
        this.agendamentos = new Services('Agendamentos')
    }

    async listAll(where = {}) {
        return database[this.modelo].scope('all').findAndCountAll(
            { paranoid: false }, { where : {...where } }, { order: [['nome', 'ASC']] }
            )
    }

    async listAllAgendamentosCliente(clienteId) {
        return this.agendamentos.buscaGeral(
            {
                cliente_id: clienteId
             }, 
             { order: [['data_agendamento', 'ASC']] }
            )
    }

    async deletePessoa(id) {
        const statusRemovido = {
            status: 'removido'
        }
        const ativoFalse =  {
            "ativo": "false"
        }
        try {
            database.sequelize.transaction(async (trRemovePessoa) => {
                await super.updateRegistro(ativoFalse, id, { transaction: trRemovePessoa });
                await this.agendamentos.updateRegistros(
                    statusRemovido, { cliente_id: id }, { transaction: trRemovePessoa }
                    );
                await this.agendamentos.deleteRegistro({ cliente_id: id }, { transaction: trRemovePessoa });

                return await super.deleteRegistro({ id: id }, { transaction: trRemovePessoa });
                        }) 
        } catch (error) {
            return res.status(500).send(error.message);
        }
        
    }

    async restauraPessoa(id) {
        const ativoTrue =  {
            "ativo": "true"
        }
        try {
            database.sequelize.transaction(async (trRestauraPessoa) => {
                await database[this.modelo].scope('all').update(ativoTrue, { paranoid: false }, { where: { id: id } }, { transaction: trRestauraPessoa });
                return await super.restauraRegistro({ id: id }, { transaction: trRestauraPessoa });
                }) 
        } catch (error) {
            return res.status(500).send(error.message);
        }
        
    }

}

module.exports = PessoasServices
