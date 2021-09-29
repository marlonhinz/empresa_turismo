
const express = require('express');

const app = express();

const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/motorista', (req, res) => {
    res.render('motorista')
})
app.get('/cad-motorista', (req, res) => {
    res.render('cad-motorista')
})
app.post('/motorista', (req, res) => {

    res.send( req.body.cnh + req.body.nome)
    
})




