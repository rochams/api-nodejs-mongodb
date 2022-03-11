const mongoose = require('mongoose');


const Nota = mongoose.Schema({

    nota: {type: Number, required: true},
    
},
{
    timestamps: true,
});

// timestamps adicionado pra se obter a informação de quandoa nota foi lançada


module.exports = mongoose.model('nota', Nota);