const mongoose = require('mongoose');

const Matricula = mongoose.Schema({
    
    numero: {type: Number, required: true},
    
});

// o primeiro parâmetro é como ficará no db, e o segundo é qual objeto ele referencia.
module.exports = mongoose.model('matricula', Matricula);
