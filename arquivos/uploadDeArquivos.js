const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeDoArquivo, callbakImagemCriada) => {

  const tipoValidos = ['jpg', 'png', 'jpeg']
  const tipo = path.extname(caminho)
  const tipoEhValido = tipoValidos.indexOf(tipo.substring(1))

  if(tipoEhValido === -1){
    console.log('Erro! Tipo inválido')
  } else{
    const novoCaminho = `./assets/img/${nomeDoArquivo}${tipo}`

    fs.createReadStream(caminho)
    .pipe(fs.createWriteStream(novoCaminho))
    .on('finish', () => callbakImagemCriada(novoCaminho))
  }  
}

