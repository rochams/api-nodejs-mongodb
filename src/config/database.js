const mongoose = require('mongoose');

class Connection {
    constructor() {
        this.mongoConnection(); // chamando o método
    }

    mongoConnection(){
        this.dbConnection = mongoose.connect("mongodb://localhost:27017/instituicao")    // primeiro parâmetro: url; segundo: configurações de recursos.
        .then(() => {
            console.log("Conexão [Sucesso].")
        })
        .catch((error) => {
            console.log("Erro ao conectar DB:", error)
        })
    }
}


module.exports = new Connection();
