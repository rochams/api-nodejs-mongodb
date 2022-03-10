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
        const id = req.body._id
        let cursoExists = await Curso.findById({ id });

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

        const id = req.body._id
        const del = await Curso.findByIdAndDelete({id});

        if (del)
            return res.status(200).json({msg: "Curso excluído com sucesso."})

        return res.status(400).json({msg: "Não foi possível excluir o curso."})

    }

    async updateCurso(req, res) {

        const id = req.body._id

        if (await Curso.findByIdAndUpdate({id}))
            return res.status(200).json({msg: "Curso alterado com sucesso."})

        return res.status(400).json({msg: "Não foi possível alterar o cadastro."})
    }
};




module.exports = new CursoController();
