//
const Sequelize = require('sequelize');

const sequelize = new Sequelize('empresa_turismo', 'luciano-holz', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(() => console.log("Conexão realizada com sucesso!"))
.catch((erro) => console.log("Erro ao realizar a conexao com o banco de dados." + erro));

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};