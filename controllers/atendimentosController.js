const Atendimento = require('../models/atendimentos')

module.exports = app => {

  app.get('/atendimentos', (req, res) => {
    Atendimento.listar(res);
  })

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    Atendimento.buscarPorId(id, res);
  })

  app.post('/atendimentos', (req, res) => {
    
    Atendimento.adiciona(req.body, res)
  })

  app.patch('/atendimentos/:id', (req, res) =>{
    const id = parseInt(req.params.id)
    const valores = req.body;
    Atendimento.alterar(id, valores, res);
  })

  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body;
    Atendimento.deletar(id, valores, res)
  })
}


