//Arquivo com as configurações da aplicação
const express = require('express');//Importando o módulo express
const consign = require('consign');//Importando o módulo consign


//precisaremos criar um module.exports e exportar uma função, que no caso irá configurar o aplicativo e irá retornar a variável app.
module.exports = () => {
    const app = express();

    //para identificar os formatos de entrada
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // O consign irá agrupar todas as rotas que formos criando dentro do app.
    //Para utilizarmos o consign, precisaremos inserir a pasta de controllers e todos os módulos que ela contém para que eles possam ser acessados pelo app.
    consign()
        .include('controllers')
        .into(app)

    return app;
}