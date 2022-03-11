const Nota = require('../Models/Nota');



class NotaController {

    async showNota(req, res){

        let notas = await Nota.find({})
        return res.status(200).json({
            notas       // retorna o array com os nomes
        })
    };

    async addNota(req, res){

        
        // verificação de existência na base de dados:
        const nota = req.body.nota
        let NotaExists = await Nota.findOne({ nota });

        if (NotaExists) {
            return res.status(400).json({
                msg: "Nota já cadastrada."
            })
        };

        let newNota = new Nota();
        newNota.nota = req.body.nota;
        newNota.save();

        
        if(res.status(200))
            return res.json({msg: "Nota inserida com sucesso!"})
        if(res.status(400))
            return res.json({aviso: "Erro ao inserir nota."})
    };

    async delNota(req, res) {
        const id = req.body._id

        await Nota.findByIdAndDelete({id});
        return res.status(200).json({msg: "Nota excluída"})
        

    }

    async updateNota(req, res) {
        const id = req.body._id

        if (await Nota.findByIdAndUpdate({id}))
            return res.status(200).json({msg: "Nota alterada!."})

        return res.status(400).json({msg: "Não foi possível alterar a nota."})
    }
};




module.exports = new NotaController();