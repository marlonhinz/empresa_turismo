//Arquivo para conectar com o banco de dados
const Sequelize = require('sequelize');

const sequelize = new Sequelize('empresa_turismo', 'luciano-holz', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(() => console.log("Conexão realizada com sucesso!"))
.catch((erro) => console.log("Erro ao realizar a conexao com o banco de dados." + erro));

const Motorista = sequelize.define('motorista', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true
    },
    cnh: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
    },
    nascimento: {
        type: Sequelize.DATE,
    },
    sexo: {
        type: Sequelize.ENUM('M', 'F')
    },
    telefone: {
        type: Sequelize.STRING
    },
    rua: {
        type: Sequelize.STRING
    },
    numero: {
        type: Sequelize.INTEGER
    },
    bairro: {
        type: Sequelize.STRING
    },
    cidade: {
        type: Sequelize.STRING
    },
    uf: {
        type: Sequelize.STRING
    }
});

// Motorista.create({
//     cnh: "11223344556",
//     nome: "Luciano",
//     nascimento: 1982-07-01,
//     sexo: "M",
//     telefone: "984516817",
//     rua: "Dom Pedro I",
//     numero: 62,
//     bairro: "Medianeira",
//     cidade: "São Lourenço do Sul",
//     uf: "RS"
// })

//Motorista.sync({force: true});


//module.exports = sequelize;
