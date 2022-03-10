const mongoose = require('mongoose');

const Aluno = mongoose.Schema({
    nome: {type: String, required: true},
    cpf: {type: Number, required: true},
    email: {type: String, required: true}
    
},
{
    timestamps: true,
});

// o primeiro parâmetro é como ficará no db, e o segundo é qual objeto ele referencia.
module.exports = mongoose.model('aluno', Aluno);