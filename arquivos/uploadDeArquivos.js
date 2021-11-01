const fs = require('fs')

fs.createReadStream('../assets/img/salsicha.jpg')
  .pipe(fs.createWriteStream('../assets/img/salsicha-stream.jpg'))
    .on('finish', () => {
      console.log('Imagem foi escrita com sucesso')
    })
