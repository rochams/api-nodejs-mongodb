const { Router } = require('express');
const AlunoController = require('./app/Controllers/AlunoController');
const CursoController = require('./app/Controllers/CursoController');
const MatriculaController = require('./app/Controllers/MatriculaController')
const AuthenticateMdw = require('./app/Middlewares/AutMiddleware');

const routes = new Router();

// routes - alunos
routes.post('/alunos/novo', AlunoController.addAluno);
routes.get('/alunos', AuthenticateMdw, AlunoController.showAluno);
routes.delete('/alunos/excluir', AlunoController.delAluno);
routes.put('/alunos/alterar', AlunoController.updateAluno);


// login com validação jwt
routes.post('/alunos/login', AlunoController.login);

// routes -cursos
routes.post('/cursos/novo', CursoController.addCurso)
routes.get('/cursos', CursoController.showCurso);
routes.delete('/cursos/excluir', CursoController.delCurso);
routes.put('/cursos/alterar', CursoController.updateCurso);

// routes - matricula
routes.post('/matricula/nova', MatriculaController.addMatricula)
routes.get('/matriculas', MatriculaController.showMatricula);
routes.delete('/matricula/excluir', MatriculaController.delMatricula);
routes.put('/matricula/alterar', MatriculaController.updateMatricula);




module.exports = routes;
