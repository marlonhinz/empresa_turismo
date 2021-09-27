//Arquivo para controlar as rotas e a função delas
//importando o método Motorista
const Motorista = require('../models/indexModels');
const Carro = require('../models/indexModels');
const Viagem = require('../models/indexModels');

module.exports = app => {  
    ////////Rotas para a tabela motorista//////
    app.post('/motorista', (req, res) => {
        const motorista = req.body;
        Motorista.adiciona(motorista, res);
    });
    app.get('/motorista', (res) => {
        Motorista.lista(res);
    });
    app.get('/motorista/:id', (req, res) => {
        const id = parseInt(req.params.id);
        console.log(id);
        Motorista.buscaId(id, res);
    });
    app.patch('/motorista/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        Motorista.altera(id, valores, res);
    });
    app.delete('/motorista/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Motorista.deleta(id, res);
    });

    /////////Rotas para a tabela carro/////////
  
    app.post('/carro', (req, res) => {
        const carro = req.body;
        Carro.adiciona(carro, res);
    })
    app.get('/carro', (res) => {
        Carro.lista(res);
    });
    app.get('/carro/:id', (req,res) => {
        const id = parseInt(req.params.id);
        console.log(id);
        Carro.buscaId(id, res);
    });
    app.patch('/carro/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        Carro.altera(id, valores, res);
    });
    app.delete('/carro/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Carro.deleta(id, res);
    });
    
    ////////Rotas para a tabela viagem
    app.post('/viagem', (req, res) => {
        const viagem = req.body;
        Viagem.adiciona(viagem, res);
    })
    app.get('/viagem', (res) => {
        Viagem.lista(res);
    });
    app.get('/viagem/:id', (req,res) => {
        const id = parseInt(req.params.id);
        console.log(id);
        Viagem.buscaId(id, res);
    });
    app.patch('/viagem/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        Viagem.altera(id, valores, res);
    });
    app.delete('/viagem/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Viagem.deleta(id, res);
    });
}
