import agendamentos from "../models/Agendamento.js";

class agendamentoController {
    static listarAgendamentos = (req, res) => {
        agendamentos.find()
        .populate('usuario')
        .exec((err, agendamentosReq) =>  {
            res.status(200).json(agendamentosReq);
          });
    }

    static listarByID = (req, res) => {
        const id = req.params.id;
        agendamentos.findById(id, (err, agendamentos) => {
            if(err) {
                res.status(400).send({ message: `${err.message} - O agendamento não foi localizado!` });
            } else {
                res.status(200).send(agendamentos);
            }
        })
    }

    static listarByUsuario = (req, res) => {
        const usuario = req.query.usuario;
        agendamentos.find({ 'usuario': usuario })
        .populate('usuario')
        .exec((err, agendamentos) => {
            if(err) {
                res.status(400).send({ message: `${err.message} - O agendamento não foi localizado!` });
            } else {
                res.status(200).send(agendamentos);
            }
        })
    }

    static cadastrarAgendamento = (req, res) => {
        let agendamento = new agendamentos(req.body);

        agendamento.save((err) => {
            if(err) {
                res.status(500).send({ message: `${err.message} - ***Falha*** no cadastro do novo agendamento.` });
            }else{
                res.status(201).send(agendamento.toJSON());
            }
        })
    }

    static atualizarAgendamento = (req, res) => {
        const id = req.params.id;
        agendamentos.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({ message: 'Agendamento atualizado com sucesso!' });
            } else {
                res.status(500).send({ message: err.message });
            }
        })
    }

    static removerAgendamento = (req, res) => {
        const id = req.params.id;

        agendamentos.findByIdAndRemove(id, (err) => {
            if(!err) {
                res.status(200).send('O agendamento selecionado foi removido com sucesso!');
            } else {
                res.status(500).send({ message: err.message });
            }
        })
    }
}

export default agendamentoController;