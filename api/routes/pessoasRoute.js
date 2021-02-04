const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.pegaPessoasAtivas)
router.get('/pessoas/todos', PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
router.get('/pessoas/:idPessoa/matriculas/:idMatricula', PessoaController.pegaUmaMatricula)
router.get('/pessoas/:id/matriculas', PessoaController.pegaMatriculas)
router.get('/pessoas/matriculas/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma)
router.get('/pessoas/matriculas/lotada', PessoaController.pegaTurmasLotadas)
router.post('/pessoas', PessoaController.criaPessoa)
router.post('/pessoas/:id/restura', PessoaController.restauraPessoas)
router.post('/pessoas/:idPessoa/matriculas', PessoaController.criaMatricula)
router.post('/pessoas/:idPessoa/cancela', PessoaController.cancelaPessoa)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)
router.delete('/pessoas/:id', PessoaController.deletaPessoa)
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)

module.exports = router