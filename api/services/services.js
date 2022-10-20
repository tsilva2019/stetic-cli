const database = require('../models')

class Services {
    constructor(modelo) {
        this.modelo = modelo
    }

    async listAll() {
        return database[this.modelo].findAndCountAll()
    }

    async buscaByID(id) {

    }

    async createRegistro(dados) {

    }

    async updateRegistro(dadosAtualizados, id) {

    }

    async deleteRegistro(id) {

    }


}

module.exports = Services