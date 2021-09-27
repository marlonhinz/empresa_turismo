//Arquivo para subir o servidor
//importando o arquivo customExpress
const customExpress = require('./config/customExpress');
//importando o arquivo conexao
const conexao = require('./infra/conexao');
//importando o arquivo tabelas
const Tabelas = require('./infra/tabelas');
//Para sabermos se falhou ou funcionou sem problemas, passaremos uma função para executar quando se conectar.
conexao.connect(erro => {
    if(erro) {
        console.log(erro);
    } else {
        console.log("Conectado com sucesso");

        //antes do app igual a customExpress temos Tabelas com .init() recebendo a conexao.
        Tabelas.init(conexao);

        //Precisaremos declarar que const app será igual a customExpress()
        //Queremos que conecte com a API apenas depois de termos nos conectado com sucesso de fato.
        //Caso o servidor não estiver funcionando, receberemos o console.log() de erro rapidamente para podermos resolver a questão.
        const app = customExpress();

        app.listen(8080, () => console.log('Servidor rodando na porta 8080.'));
    }
})


