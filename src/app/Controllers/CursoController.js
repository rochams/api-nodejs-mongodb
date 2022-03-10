const Curso = require('../Models/Curso');
const yup = require('yup');


class CursoController {

    async showCurso(req, res){

        let cursos = await Curso.find({});
        return res.status(200).json({
            cursos       // retorna o array com os nomes
        })
    };

    async addCurso(req, res){

        
        // verificação de existência na base de dados:

        let cursoExists = await Curso.findOne({ nome: req.body.nome });

        if (cursoExists) {
            return res.status(400).json({
                msg: "Curso já cadastrado."
            })
        };

        let newCurso = new Curso();
        newCurso.nome = req.body.nome;
        newCurso.descricao = req.body.descricao;
        newCurso.turno = req.body.turno;
        newCurso.vagas = req.body.vagas

        newCurso.save();

        if(res.status(200))
            return res.json({msg: "Curso cadastrado com sucesso!"})
        if(res.status(400))
            return res.json({aviso: "Erro ao cadastrar curso."})
    };

    
    async delCurso(req, res) {

        await Curso.findOneAndDelete({nome: req.body.name});


    }

    async updateCurso(req, res) {

        if (await Curso.findOneAndDelete({nome: req.body.nome}))
            return res.status(200).json({msg: "Curso alterado com sucesso."})

    }
};




module.exports = new CursoController();
