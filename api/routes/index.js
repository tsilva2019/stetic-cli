const bodyParser = require('body-parser');
const pessoas = require('./pessoasRoute');
const agendamentos = require('./agendamentoRoute');

module.exports = app => {
    app.use(
        bodyParser.json(),
        pessoas,
        agendamentos
        );
    app.get('/', (req, res) => res.json({ mensagem: 'Bem vindo à API Stetic-cli!' }));
}