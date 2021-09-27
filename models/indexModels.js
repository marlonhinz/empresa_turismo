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
        const sql = 'SELECT * FROM motorista';

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
                    res.json(erro);
                } else {
                res.json(carro);
                }
            })
        } 
    }
    lista(res) {
        const sql = 'SELECT * FROM carro';

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
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
                res.status(400).json(carro);
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

//classe para inserir dados na tabela viagem
class Viagem {
    adiciona(viagem, res) {
        const destinoValido = viagem.destino.length >= 5;
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const dataSaida = moment(viagem.dataSaida, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const dataRet = moment(viagem.dataRetorno, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const dataRetorno = moment(dataRet).isSameOrAfter(dataSaida);
        
        const validacoes = [ 
            {
                nome: "destino",
                valido: destinoValido,
                mensagem: "O campo destino deve ter no mínimo 5 caracteres."
            },
            {
                nome: "dataRetorno",
                valido: dataRetorno,
                mensagem: "A data de retorno deve ser posterior a data de saída."
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido);
        const errosExistem = erros.length;

        const viagemDatas = {...viagem, dataCriacao};
        if(errosExistem) {
            res.status(400).json(erros);
        } else {
            const sql = 'INSERT INTO viagem SET ?';

            conexao.query(sql, viagemDatas, (erro) => {
                if(erro) {
                    res.json(erro);
                } else {
                    res.json(viagemDatas);
                }
            })
        }  
    }
    lista(res) {
        const sql = 'SELECT * FROM viagem';

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        })
    }
    buscaId(id, res) {
        const sql = `SELECT * FROM viagem WHERE id=${id}`;

        conexao.query(sql, (erro, resultados) => {
            const viagem = resultados[0];
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(400).json(viagem);
            }
        })
    }
    altera(id, valores, res) {
        const sql = 'UPDATE viagem SET ? WHERE id=?';

        conexao.query(sql, [valores, id], (erro) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({...valores, id});
            }
        })
    }
    deleta(id, res) {
        const sql = 'DELETE FROM viagem WHERE id=?';

        conexao.query(sql, id, (erro) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(`O id ${id} foi deletado com sucesso!`);
            }
        })
    }
}

//exportando as classes
module.exports = new Motorista;
module.exports = new Carro;
module.exports = new Viagem;
