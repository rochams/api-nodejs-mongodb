const Aluno = require('../Models/Aluno');
const bcrypt = require('bcryptjs');
const yup = require('yup');
const jwt = require('jsonwebtoken');
const config = require('../../config/authentication')


class AlunoController {

    async showAluno(req, res){

        let alunos = await Aluno.find({}).sort({"name": 1}).populate('matricula').populate('curso');
        return res.status(200).json({
            alunos       // retorna o array com os nomes
        })
    };

    async addAluno(req, res){

        // validação dos dados (por yup):
        let schema = yup.object().shape({
            nome: yup.string().required(),
            cpf: yup.number().required().positive().integer(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            curso: yup.string().required(),
            matricula : yup.string().required(),
            createdOn: yup.date().default(function () {
              return new Date();
            }),
        });
        
        if(!(await schema.isValid(req.body))){

            return res.status(400).json({
                msg: "Favor, preencha corretamente os campos."
            })
        }
        
        // verificação de existência na base de dados:

        let emailExists = await Aluno.findOne({ email: req.body.email });
        let cpfExists = await Aluno.findOne({ cpf: req.body.cpf });

        if (emailExists) {
            return res.status(400).json({
                msg: "E-mail já cadastrado."
            })
        };
        if (cpfExists) {
            return res.status(400).json({
                msg: "CPF já cadastrado."
            })
        };

        //recebimento dos dados
        const {nome, cpf, email, password, curso, matricula } = req.body;

        const dados = {nome, cpf, email, password, curso, matricula};
        dados.password = await bcrypt.hash(dados.password, 10);

        await Aluno.create(dados, (err) => {
            if (err)
                return res.status(400).json({
                    msg: "Erro ao cadastrar.", err
                })
                return res.status(200).json({
                    msg: "Cadastrado com sucesso."
                })
        })
    };
    async delAluno(req, res) {
        const id = req.body._id
        // excluindo aluno pelo campo e-mail
        await Aluno.findByIdAndDelete({id});

        await Aluno.find({}).sort({"name": 1});
        

    };

    async login(req, res) {

        const { email, password } = req.body

        const alunoExists = await Aluno.findOne({email})
        if(!alunoExists) {
            return res.status(400).json({msg: "Usuário não encontrado."});
        }

        // validação

        if(!(await bcrypt.compare(password, alunoExists.password))) {
            return res.status(400).json({msg: "Senha inválida."})
        }

        return res.status(200).json({
            aluno: {
                nome: alunoExists.nome,
                email: alunoExists.email,
            },

            
            token: jwt.sign({id: alunoExists._id}, config.secret, {expiresIn: config.expire})
        })
        
    }

    async updateAluno(req, res) {


        if (await Curso.updateOne(
            { _id: req.body._id },
            { nome: req.body.nome }
        ))
            return res.status(200).json({msg: "Cadastro alterado com sucesso."})

    }


}



module.exports = new AlunoController();

