const Services = require('./Services')
const database = require('../models')

class AgendamentoServices extends Services {
    constructor() {
        super('Agendamentos')
       // this.pessoas = new Services('Pessoas')
    }

    async listAll(where = {}) {
        return database[this.modelo].scope('all').findAndCountAll(
            { paranoid: false }, { where : {...where } }, { order: [['data_agendamento', 'ASC']] }
            )
    }

    async listAllAgendamentosCliente(clienteId) {
        return database[this.modelo].buscaGeral(
            {
                cliente_id: clienteId
             }, 
             { order: [['data_agendamento', 'ASC']] }
            )
    }

    async deleteAgendamento(id) {
        const statusRemovido = {
            status: 'removido'
        }
        try {
            database.sequelize.transaction(async (trRemoveAgendamento) => {
                await super.updateRegistro(
                    statusRemovido, id , { transaction: trRemoveAgendamento }
                    );
                return await super.deleteRegistro({ id: id }, { transaction: trRemoveAgendamento });
                        }) 
        } catch (error) {
            return res.status(500).send(error.message);
        }
        
    }

    async restauraAgendamento(id) {
        const statusRestaurado = {
            status: 'restaurado'
        }
        try {
            database.sequelize.transaction(async (trRestauraAgendamento) => {
                await database[this.modelo].scope('all').update(statusRestaurado, { paranoid: false }, { where: { id: id } }, { transaction: trRestauraAgendamento });
                return await super.restauraRegistro({ id: id }, { transaction: trRestauraAgendamento });
                }) 
        } catch (error) {
            return res.status(500).send(error.message);
        }
        
    }

}

module.exports = AgendamentoServices
