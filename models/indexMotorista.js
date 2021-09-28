//Arquivo responsável pela conexão com os métodos necessários
//importando o modulo moment
const moment = require('moment');
//importando o arquivo conexao
const conexao = require('../infra/conexao');

//classe para inserir dados na tabela motorista
class Motorista {
    adiciona(motorista, res) {
        
        const cnhValida = motorista.cnh.length == 11;
        const nomeValido = motorista.nome.length >= 5;

        const validacoes = [ 
            {
                nome: "cnh",
                valido: cnhValida,
                mensagem: "Cnh deve ter 11 numeros."
            },
            {
             nome: "nome",
             valido: nomeValido,
             mensagem: "O campo nome deve ter no mínimo 5 caracteres."
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido);
        const errosExistem = erros.length;

        if(errosExistem) {
            res.status(400).json(erros);
        } else {
            const sql = 'INSERT INTO motorista SET ?';
            const motoristaAll = 'SELECT * FROM motorista';
            
            conexao.query(sql, motorista, (erro, resultados) => {

                if(erro) {
                    res.json(erro);
                } else {
                    res.json(motoristaAll);
                }
            })
        }   
    }
    lista(res) {
        const sql = `SELECT * FROM motorista`;

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        })
    }
    buscaId(id, res) {
        const sql = `SELECT * FROM motorista WHERE id=${id}`;
        conexao.query(sql, (erro, resultados) => {
            const motorista = resultados[0];
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(motorista);
            }
        }) 
    }
    altera(id, valores, res) {
        const sql = 'UPDATE motorista SET ? WHERE id=?';

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({...valores, id});
            }
        })
    }
    deleta(id, res) {
        const sql = 'DELETE FROM motorista WHERE id=?';

        conexao.query(sql, id, (erro) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(`O id ${id} foi deletado com sucesso!`);
            }
        })
    }
}


//exportando a classe
module.exports = new Motorista;

