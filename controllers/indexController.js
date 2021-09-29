//Arquivo para controlar as rotas e a função delas
//importando o método Motorista
const Motorista = require('../models/indexMotorista');
const Carro = require('../models/indexCarro');
const Viagem = require('../models/indexViagem');
const express = require('express');
const app = express();

const handlebars = require('express-handlebars');
const moment = require('moment');

app.engine('handlebars', handlebars({
    defaultLayout:'main',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      formatDate: (date) => {
        return moment(date).format('DD/MM/YYYY')
      }}
  }))
app.set('view engine', 'handlebars')
    
app.use(express.urlencoded({extended: false}));
app.use(express.json());

    ////////Rotas para a tabela motorista//////

    app.get('/motorista', (req, res) => {
        Motorista.findAll().then((motoristas) => {
            res.render('motorista', {motoristas: motoristas});
        })
        
    })
    app.get('/motorista', (req, res) => {
        res.render('motorista')
    })
    app.post('/motorista', (req, res) => {
        Motorista.create({
            cnh: req.body.cnh,
            nome: req.body.nome,
            nascimento: req.body.nascimento,
            sexo: req.body.sexo,
            telefone: req.body.telefone,
            rua: req.body.rua,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            uf: req.body.uf
        })
        .then(() => res.redirect('/motorista'))
        .catch((erro) => res.send("Cadastro de motorista não realizado."+ erro))
    })

    // app.post('/motorista', (req, res) => {
    //     const motorista = req.body;
    //     Motorista.adiciona(motorista, res );
    // });
    // app.get('/motorista', (req, res) => {
    //     Motorista.lista(res);
    //     res.send('/motorista');
    // });
    // app.get('/motorista/:id', (req, res) => {
    //     const id = parseInt(req.params.id);
    //     console.log(id);
    //     Motorista.buscaId(id, res);
    // });
    // app.patch('/motorista/:id', (req, res) => {
    //     const id = parseInt(req.params.id);
    //     const valores = req.body;
    //     Motorista.altera(id, valores, res);
    // });
    // app.delete('/motorista/:id', (req, res) => {
    //     const id = parseInt(req.params.id);
    //     Motorista.deleta(id, res);
    // });

    // /////////Rotas para a tabela carro/////////
    app.get('/carro', (req, res) => {
        Carro.findAll().then((carros) => {
            res.render('carro', {carros: carros});
        })  
    })

    app.get('/carro', (req, res) => {
        res.render('carro')
    })

    app.post('/carro', function(req, res){
        Carro.create({
            renavam: req.body.renavam,
            modelo: req.body.modelo,
            passageiros: req.body.passageiros,
            fabricacao: req.body.fabricacao,
            placa: req.body.placa
        }).then(function(){
          res.redirect("/carro")
        }).catch(function(erro){
          res.send("Erro: Cadastro de carro nao realizado!" + erro)
        })
    });
  
    // app.post('/carro', (req, res) => {
    //     const carro = req.body;
    //     Carro.adiciona(carro, res);
    // })
    // app.get('/carro', (req, res) => {
    //     Carro.lista(res);
    // });
    // app.get('/carro/:id', (req,res) => {
    //     const id = parseInt(req.params.id);
    //     console.log(id);
    //     Carro.buscaId(id, res);
    // });
    // app.patch('/carro/:id', (req, res) => {
    //     const id = parseInt(req.params.id);
    //     const valores = req.body;
    //     Carro.altera(id, valores, res);
    // });
    // app.delete('/carro/:id', (req, res) => {
    //     const id = parseInt(req.params.id);
    //     Carro.deleta(id, res);
    // });
    
    // // ////////Rotas para a tabela viagem
    app.get('/viagem', (req, res) => {
        Viagem.findAll().then((viagens) => {
            res.render('viagem', {viagens: viagens});
        })
        
    })
    app.get('/viagem', (req, res) => {
        res.render('viagem')
    })
    app.post('/viagem', function(req, res){
        Viagem.create({
            destino: req.body.destino,
            dataSaida: req.body.dataSaida,
            dataRetorno: req.body.dataRetorno,
            cnhMotorista: req.body.cnhMotorista,
            renavamCarro: req.body.renavamCarro
        }).then(function(){
          res.redirect("/viagem")
        }).catch(function(erro){
          res.send("Erro: Cadastro de viagem nao realizado!" + erro)
        })
    });

    // app.post('/viagem', (req, res) => {
    //     const viagem = req.body;
    //     Viagem.adiciona(viagem, res);
    // })
    // app.get('/viagem', (req, res) => {
    //     Viagem.lista(res);
    // });
    // app.get('/viagem/:id', (req,res) => {
    //     const id = parseInt(req.params.id);
    //     console.log(id);
    //     Viagem.buscaId(id, res);
    // });
    // app.patch('/viagem/:id', (req, res) => {
    //     const id = parseInt(req.params.id);
    //     const valores = req.body;
    //     Viagem.altera(id, valores, res);
    // });
    // app.delete('/viagem/:id', (req, res) => {
    //     const id = parseInt(req.params.id);
    //     Viagem.deleta(id, res);
    // });
app.listen(8080, () => console.log("Conectado na porta 8080!"))
