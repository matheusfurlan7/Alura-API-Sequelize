const database = require('../models')

class PessoaController {
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll()
      return res.status(200).json(todasAsPessoas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaPessoa(req, res) {
    try {
      const { id } = req.params;
      const pessoa = await database.Pessoas.findOne({ where: { id: id } })
      return res.status(200).json(pessoa)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaPessoa(req, res) {
    const { nome, ativo, email, role } = req.body
    try {
      const pessoa = await database.Pessoas.create({ nome: nome, ativo: ativo, email: email, role: role });
      return res.status(201).json(pessoa)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaPessoa(req, res) {
    const { nome, ativo, email, role } = req.body
    const { id } = req.params;
    try {
      const pessoa = await database.Pessoas.update({ nome: nome, ativo: ativo, email: email, role: role }, { where: { id: id } });
      return res.status(200).json(pessoa)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deletaPessoa(req, res) {
    const { id } = req.params;
    try {
      const pessoa = await database.Pessoas.destroy({ where: { id: id } });
      return res.status(200).json(pessoa)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaMatricula(req, res) {
    const { idPessoa, idMatricula } = req.params;
    try {
      const matricula = await database.Matriculas.findOne({ where: { estudante_id: idPessoa, id: idMatricula } })
      res.status(200).json(matricula)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  static async criaMatricula(req, res) {
    const { idPessoa } = req.params;
    const { status, turma_id } = req.body
    try {
      const matricula = await database.Matriculas.create({estudante_id: idPessoa, status: status, turma_id: turma_id });
      return res.status(201).json(matricula)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  
}

module.exports = PessoaController