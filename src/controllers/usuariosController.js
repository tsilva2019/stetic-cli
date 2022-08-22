import usuarios from "../models/Usuario.js";

class usuarioController {
    static listarUsuarios = (req, res) => {
        usuarios.find((err, usuariosReq) =>  {
            res.status(200).json(usuariosReq);
          });
    }

    static listarByID = (req, res) => {
        const id = req.params.id;
        usuarios.findById(id, (err, usuarios) => {
            if(err) {
                res.status(400).send({ message: `${err.message} - O usuario não foi localizado!` });
            } else {
                res.status(200).send(usuarios);
            }
        })
    }

    static cadastrarUsuario = (req, res) => {
        let usuario = new usuarios(req.body);

        usuario.save((err) => {
            if(err) {
                res.status(500).send({ message: `${err.message} - ***Falha*** no cadastro do novo usuario.` });
            }else{
                res.status(201).send(usuario.toJSON());
            }
        })
    }

    static atualizarUsuario = (req, res) => {
        const id = req.params.id;
        usuarios.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({ message: 'Usuario atualizado com sucesso!' });
            } else {
                res.status(500).send({ message: err.message });
            }
        })
    }

    static removerUsuario = (req, res) => {
        const id = req.params.id;

        usuarios.findByIdAndRemove(id, (err) => {
            if(!err) {
                res.status(200).send('O usuario selecionado foi removido com sucesso!');
            } else {
                res.status(500).send({ message: err.message });
            }
        })
    }
}

export default usuarioController;