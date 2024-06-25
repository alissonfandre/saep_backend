const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'saep_db'
});

db.connect((err) => {
  if (err) {
    throw `Erro ao conectar o banco de dados: ${err}`;
  }
  console.log('Conectado ao banco de dados MySQL');
});

module.exports = db;