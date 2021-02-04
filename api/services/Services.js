const database = require('../models')

class Services {
  constructor(nomeModelo) {
    this.nomeModelo = nomeModelo
  }

  async pegaTodosRegistros() {
    console.log('passou aqui')
    return database[this.nomeModelo].findAll()
  }
}

module.exports = Services;