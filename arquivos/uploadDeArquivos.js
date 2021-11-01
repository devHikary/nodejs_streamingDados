const fs = require('fs')

fs.readFile('../assets/img/salsicha.jpg', (erro, buffer) => {
  console.log('imagen foi bufferizada')


  fs.writeFile('../assets/img/salsicha2.jpg', buffer, erro => {
    console.log('imagen foi escrita')
  })
})