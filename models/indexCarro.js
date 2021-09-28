//Arquivo responsável pela conexão com os métodos necessários
//importando o modulo moment
const moment = require('moment');
//importando o arquivo conexao
const conexao = require('../infra/conexao');


//classe para inserir dados na tabela carro
class Carro {
    adiciona(carro, res) {
        const modeloValido = carro.modelo.length >= 5;

        const validacoes = [
            {
                nome: "modelo",
                valido: modeloValido,
                mensagem: " O campo modelo deve ter no mínimo 5 caracteres"
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const errosExistem = erros.length;
        if(errosExistem) {
            res.status(400).json(erros);
        } else {
            const sql = 'INSERT INTO carro SET ?';

            conexao.query(sql, carro, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(200).json(carro);
                }
            })
        } 
    }
    lista(res) {
        const sql = 'SELECT * FROM carro';

        conexao.query(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        })
    }
    buscaId(id, res) {
        const sql = `SELECT * FROM carro WHERE id=${id}`;

        conexao.query(sql, (erro, resultados) => {
            const carro = resultados[0];
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(carro);
            }
        })
    }
    altera(id, valores, res) {
        const sql = 'UPDATE carro SET ? WHERE id=?';

        conexao.query(sql, [valores, id], (erro) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({...valores, id});
            }
        })
    }
    deleta(id, res) {
        const sql = 'DELETE FROM carro WHERE id=?';

        conexao.query(sql, id, (erro) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(`O id ${id} foi deletado com sucesso!`);
            }
        })
    }
}


//exportando a classe carro
module.exports = new Carro;

