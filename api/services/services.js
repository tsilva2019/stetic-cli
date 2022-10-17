const database = require('../models')

class Services {
    constructor(modelo) {
        this.modelo = modelo
    }

    async listAll() {
        return database[this.modelo].findAndCountAll()
    }
}

module.exports = Services