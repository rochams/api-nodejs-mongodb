const mongoose = require('mongoose');
const Curso = require('./Curso');
const Matricula = require('./Matricula');

const Aluno = mongoose.Schema({
    nome: {type: String, required: true},
    cpf: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    curso: {type: mongoose.ObjectId, ref: Curso, max: 1, required: true},
    matricula: {type: mongoose.ObjectId, ref: Matricula, required: true}
    
},
{
    timestamps: true,
});

// o primeiro parâmetro é como ficará no db, e o segundo é qual objeto ele referencia.
module.exports = mongoose.model('aluno', Aluno);
