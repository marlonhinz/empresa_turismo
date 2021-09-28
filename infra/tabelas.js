//Arquivo para criação das tabelas

//classe Tabelas com o método init que iniciará o trabalho e receberá a conexao do banco de dados
class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarMotorista();
        this.criarCarro();
        this.criarViagem();
        
    }
    //criando a tabela motorista
    criarMotorista() {
        const sql = 'CREATE TABLE IF NOT EXISTS motorista (id INT UNIQUE AUTO_INCREMENT , cnh VARCHAR(20) NOT NULL, nome VARCHAR(100) NOT NULL, nascimento DATE NOT NULL, sexo ENUM("F","M") NOT NULL, telefone VARCHAR(20) NOT NULL, rua VARCHAR(100) NOT NULL, numero INT NOT NULL, bairro VARCHAR(100) NOT NULL, cidade VARCHAR(100) NOT NULL, uf VARCHAR(2) NOT NULL, PRIMARY KEY(cnh))';

        //função que será executada quando a tabela for criada, o primeiro parâmetro será erro, caso der tudo certo a tabela será criada
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela motorista foi criada com sucesso!')
            }
        });
    }
    //criando a tabela carro
    criarCarro() {
        const sql = 'CREATE TABLE IF NOT EXISTS carro (id INT UNIQUE AUTO_INCREMENT, renavam VARCHAR(20) NOT NULL, modelo VARCHAR(50) NOT NULL, passageiros INT NOT NULL, fabricacao VARCHAR(10) NOT NULL, placa VARCHAR(10) NOT NULL, PRIMARY KEY(renavam))';

          //função que será executada quando a tabela for criada, o primeiro parâmetro será erro, caso der tudo certo a tabela será criada
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela carro foi criada com sucesso!')
            }
        });
    }
    //criando a tabela viagem
    criarViagem() {
        const sql = 'CREATE TABLE IF NOT EXISTS viagem (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, destino VARCHAR(100) NOT NULL, dataSaida DATE NOT NULL, dataRetorno DATE NOT NULL, cnhMotorista VARCHAR(20), renavamCarro VARCHAR(20), FOREIGN KEY(cnhMotorista) REFERENCES motorista(cnh) ON DELETE CASCADE, FOREIGN KEY(renavamCarro) REFERENCES carro(renavam) ON DELETE CASCADE, dataCriacao DATETIME NOT NULL)';

        //função que será executada quando a tabela for criada, o primeiro parâmetro será erro, caso der tudo certo a tabela será criada
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela viagem foi criada com sucesso!')
            }
        });   
    }

}
//exportando a classe para podermos usa-la em outros lugares
module.exports = new Tabelas;