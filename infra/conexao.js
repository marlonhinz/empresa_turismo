//Arquivo para conectar com o banco de dados
const mysql = require('mysql2');
//constante conexao com um objeto contendo as configuraçoes
const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345",
    database: "empresa"
})

module.exports = conexao;