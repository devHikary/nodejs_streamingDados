const customExpress = require('./config/customExpress')
const conexao = require('./infra/database/conexao')
const tabela = require('./infra/database//tabelas')


conexao.connect((erro) => {
  if(erro) {
    console.log(erro)
  } else {
    console.log('conectado com sucesso')

    tabela.init(conexao);
    const app = customExpress()
    app.listen(3000, () => console.log('servidor rodando porta 3000'))
  }
})