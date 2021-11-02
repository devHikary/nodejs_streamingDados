const conexao = require('../infra/conexao')
const moment = require('moment')
const axios = require('axios')

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    const atendimentoDatado = { ...atendimento, dataCriacao, data }

    const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
    const clienteEhValido = atendimento.cliente.length >= 3

    const validacoes = [
      {
        nome: 'data',
        valido: dataEhValida,
        mensagem: 'A data deve ser igual ou posterior a data de criação'
      },
      {
        nome: 'nome',
        valido: clienteEhValido,
        mensagem: 'O nome deve ter no mínimo 3 caracteres'
      },
    ]

    const erros = validacoes.filter(validacao => !validacao.valido)

    const temErro = erros.length > 0

    if (temErro) {
      res.status(400).json(erros)
    } else {
      const sql = 'INSERT INTO Atendimentos SET ?'

      conexao.query(sql, atendimentoDatado, (erro, resultados) => {
        if (erro) {
          res.status(400).json(erro)
        } else {
          res.status(201).json(atendimento)
        }
      })
    }
  }

  listar(res) {
    const sql = 'SELECT * FROM Atendimentos '

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados)
      }
    })
  }

  buscarPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

    conexao.query(sql, async (erro, resultados) => {
      const atendimento = resultados[0];
      const cpf = atendimento.cliente
      if (erro) {
        res.status(400).json(erro);
      } else {
        const {data} = await axios.get(`http://localhost:8082/${cpf}`)
        
        atendimento.cliente = data;
        res.status(200).json(atendimento);
      }
    })
  }

  alterar(id, valores, res) {
    if (valores.data) {
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    }
    const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

    conexao.query(sql, [valores, id], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json({ ...valores })
      }
    })
  }

  deletar(id, valores, res) {
    const sql = 'DELETE FROM Atendimentos WHERE id=?'

    conexao.query(sql, id, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json({ ...valores, id })
      }
    })
  }
}

module.exports = new Atendimento