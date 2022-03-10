const mongoose = require('mongoose');

const Nota = mongoose.Schema({
    nota: {type: Number, required: true},
    
},
{
    timestamps: true,
});

// o primeiro parâmetro é como ficará no db, e o segundo é qual objeto ele referencia.
module.exports = mongoose.model('nota', Nota);