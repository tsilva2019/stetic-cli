const database = require('../models')

class Services {
    constructor(modelo) {
        this.modelo = modelo
    }

    async listAllAtivos() {
        return database[this.modelo].findAndCountAll();
    }

    async listDeleted(agregadores) {
        return database[this.modelo].scope('deleted').findAndCountAll({ paranoid: false }, { agregadores });
    }

    async buscaByID(id) {
        return database[this.modelo].findOne({ where: { id: id } });
    }

    async buscaGeral(where = {}, agregadores ) {
        return database[this.modelo].findAndCountAll({ where: { ...where }, ...agregadores });
    }

    async createRegistro(dados) {
        return database[this.modelo].create(dados);
    }
    
    async updateRegistro(dadosAtualizados, id, transaction = {}) {
        return database[this.modelo].scope('all').update(dadosAtualizados, { where: { id: id } }, transaction)
    }

    async updateRegistros(dadosAtualizados, where, transaction = {}) {
        return database[this.modelo].scope('all').update(dadosAtualizados, { where: { ...where } }, transaction)
    }

    async deleteRegistro(where, transaction = {}) {
        return database[this.modelo].scope('all').destroy({ where: { ...where } }, transaction)
    }

    async restauraRegistro(where, transaction = {}) {
        return database[this.modelo].scope('all').restore({ where: { ...where } }, transaction)
    }
}

module.exports = Services