const Matricula = require('../Models/Matricula');
const yup = require('yup');


class MatriculaController {

    async showMatricula(req, res){

        let matriculas = await Matricula.find({}).sort({"numero": 1})
        return res.status(200).json({
            matriculas       // retorna o array com os nomes
        })
    };

    async addMatricula(req, res){

        
        // verificação de existência na base de dados:

        let MatriculaExists = await Matricula.findOne({ numero: req.body.numero });

        if (MatriculaExists) {
            return res.status(400).json({
                msg: "Matricula já cadastrada."
            })
        };

        let newMatricula = new Matricula();
        newMatricula.numero = req.body.numero;


        newMatricula.save();

        if(res.status(200))
            return res.json({msg: "Matricula cadastrado com sucesso!"})
        if(res.status(400))
            return res.json({aviso: "Erro ao cadastrar matricula."})
    };
    async delMatricula(req, res) {

        await Matricula.findOneAndDelete({numero: req.body.numero});
        

    }

    async updateMatricula(req, res) {

        if (await Matricula.findOneAndDelete({numero: req.body.numero}))
            return res.status(200).json({msg: "Cadastro alterado com sucesso."})

    }
};




module.exports = new MatriculaController();