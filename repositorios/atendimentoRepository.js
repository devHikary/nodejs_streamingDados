const query = require('../infra/database/queries')

class Atendimento {
  adiciona(atendimento){
    const sql = 'INSERT INTO Atendimentos SET ?'
    return query(sql, atendimento);
  }

  lista(){
    const sql = 'SELECT * FROM Atendimentos '
    return query(sql);
  }

  buscarPorId(id) {
    const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;

    return query(sql, id);
}
}

module.exports = new Atendimento();