const conexao = require('../infra/database/conexao')
const moment = require('moment')
const axios = require('axios')
const repositorio = require('../repositorios/atendimentoRepository')

class Atendimento {
  constructor() {
    this.dataEhValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao)
    this.clienteEhValido = ({tamanho}) => tamanho == 11

    this.valida = parametros =>
      this.validacoes.filter(campo => {
        const { nome } = campo
        const parametro = parametros[nome]

        return !campo.valido(parametro)
      })

    this.validacoes = [
      {
        nome: 'data',
        valido: this.dataEhValida,
        mensagem: 'A data deve ser igual ou posterior a data de criação'
      },
      {
        nome: 'cliente',
        valido: this.clienteEhValido,
        mensagem: 'O CPF deve ter 11 caracteres'
      },
    ]
  }

  adiciona(atendimento) {

    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

    const parametros = {
      data: { data, dataCriacao },
      cliente: { tamanho: atendimento.cliente.length }
    }

    const erros = this.valida(parametros)

    const temErro = erros.length > 0

    if (temErro) {
      return new Promise((resolve, reject) => reject(erros))
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data }
      return repositorio.adiciona(atendimentoDatado)
        .then(resultados => {
          const id = resultados.insertId
          return { ...atendimento, id }
        })
    }

  }

  listar() {

    return repositorio.lista();
  }

  buscarPorId(id) {

    return repositorio.buscarPorId(id)
      .then(async resultados => {
        const atendimento = resultados[0]
        const cpf = atendimento.cliente
        const { data } = await axios.get(`http://localhost:8082/${cpf}`)
        atendimento.cliente = data
        return { atendimento }
      })

  }

  alterar(id, valores) {
    if (valores.data) {
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    }
    
    return repositorio.altera(id, valores);

  }

  deletar(id) {
 
    return repositorio.deleta(id);

  }
}

module.exports = new Atendimento