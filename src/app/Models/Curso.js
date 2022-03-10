const mongoose = require('mongoose');

const Curso = mongoose.Schema({

    nome: {type: String, required: true},
    descricao: {type: String, required: true},
    turno: {type: String, required: true, enum: ['Matutino', 'Vespertino', 'Noturno', null], default: null},
    vagas: {type: Number, required: true, min: 0, default: 0},
    
},
{
    timestamps: true,
});


module.exports = mongoose.model('curso', Curso);
