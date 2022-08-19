import express from "express";

const app = express();

app.use(express.json());

const usuarios = [
    {
        id: 1,
        nome: "Tiago Nascimento da Silva",
        email: "tsilva2004@gmail.com"
    },
    {
        id: 2,
        nome: "Helen Cristina Dantas de Moraes",
        email: "helen.cristina@gmail.com"
    }
]

// Raiz da aplicação
app.get('/', (req, res) => {
    res.status(200).send('Bem vindo ao Back-end Stetic-Cli!');
})

// lista usuarios
app.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios);
})

//lista usuario por id
app.get('/usuarios/:id', (req, res) => {
    let index = getUsuarioByID(req.params.id);
    res.json(usuarios[index]);
})

// Cria usuario
app.post('/usuarios', (req, res) => {
    usuarios.push(req.body);
    res.status(201).send('Usuario cadastrado com sucesso!');
})

//altera usuario
app.put('/usuarios/:id', (req, res) => {
    let index = getUsuarioByID(req.params.id);
    usuarios[index].email = req.body.email;
    res.json(usuarios);
})

//deleta usuario
app.delete('/usuarios/:id', (req, res) => {
    let { id } = req.params;
    let index = getUsuarioByID(id);
    usuarios.splice(index, 1);
    res.send(`Usuario ${id} removido com sucesso!`);
})

//busca usuario por id
function getUsuarioByID(id) {
    return usuarios.findIndex( usuario => usuario.id == id);
}

export default app;