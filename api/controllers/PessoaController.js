//const database = require('../models')
//const Sequelize = require('sequelize')
const Services = require('../services/Services');
const Pessoas = new Services("Pessoas");

class PessoaController {
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await Pessoas.pegaTodosRegistros();
      return res.status(200).json(todasAsPessoas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaPessoasAtivas(req, res) {
    try {
      const todasAsPessoas = await Pessoas.pegaTodosRegistros();
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
      const matricula = await database.Matriculas.create({ estudante_id: idPessoa, status: status, turma_id: turma_id });
      return res.status(201).json(matricula)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restauraPessoas(req, res) {
    const { id } = req.params
    try {
      await database.Pessoas.restore({ where: { id: id } })
      return res.status(200).json({ mensagem: `id ${id} restaurado.` });
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    const novasInfos = req.body
    try {
      await database.Matriculas.update(novasInfos, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      const MatriculaAtualizada = await database.Matriculas.findOne({ where: { id: Number(matriculaId) } })
      return res.status(200).json(MatriculaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaMatricula(req, res) {
    const { matriculaId } = req.params
    try {
      await database.Matriculas.destroy({ where: { id: Number(matriculaId) } })
      return res.status(200).json({ mensagem: `id ${matriculaId} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaMatriculas(req, res) {
    const { id } = req.params
    try {
      const pessoa = await database.Pessoas.findOne({
        where: {
          id: id
        }
      })

      const matriculas = await pessoa.getAulasMatriculadas()
      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaMatriculasPorTurma(req, res) {
    const { turmaId } = req.params
    try {
      const todasAsMatriculas = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: turmaId,
          status: "confirmado"
        },
        limit: 1,
        order: [['estudante_id', 'DESC']]
      })
      return res.status(200).json(todasAsMatriculas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaTurmasLotadas(req, res) {
    try {
      const turmasLotadas = await database.Matriculas.findAndCountAll({
        where: {
          status: "confirmado"
        },
        attributes: ["turma_id"],
        group: ["turma_id"],
        having: Sequelize.literal(`count(turma_id) > ${2}`)
      })

      return res.status(200).json(turmasLotadas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async cancelaPessoa(req, res) {
    const estudanteId = req.params.idPessoa;

    const t = await database.sequelize.transaction();
    try {
      await database.Pessoas.update({ ativo: false }, { where: { id: estudanteId } }, {transaction: t});

      //throw new Error('teste')

      await database.Matriculas.update({ status: "cancelado" }, { where: { id: estudanteId } }, {transaction: t})

      await t.commit();

      return res.status(200).json({ message: `matriculas ref. estudantes ${estudanteId} cancelada.` })
    } catch (error) {
      await t.rollback();
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PessoaController