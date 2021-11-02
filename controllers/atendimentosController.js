const Atendimento = require('../models/atendimentos')

module.exports = app => {

  app.get('/atendimentos', (req, res) => {
    Atendimento.listar()
      .then(resultados => res.json(resultados))
      .catch(erros => res.status(400).json(erros))
  })

  app.get('/atendimentos/:id', (req, res) => {

    const id = req.params.id;
    Atendimento.buscarPorId(id)
      .then(resultados => res.json(resultados))
      .catch(erros => res.status(400).json(erros))

  });

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body
    Atendimento.adiciona(atendimento)
      .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
      .catch(erros => res.status(400).json(erros))
  })

  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body;
    Atendimento.alterar(id, valores)
      .then(() => res.json({...valores, id}))
      .catch(erros => res.status(400).json(erros));
  })

  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body;
    Atendimento.deletar(id)
      .then(() => res.json({ ...valores, id }))
      .catch(erros => res.status(400).json(erros));
  })
}


