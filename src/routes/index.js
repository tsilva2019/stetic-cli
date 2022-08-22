import express from 'express';
import agendamentos from './agendamentosRoutes.js';
import usuarios from './usuariosRoutes.js';

const routes = (app) => {
    // Raiz da aplicação
    app.route('/').get((req, res) => {
        res.status(200).send({ titulo: 'Bem vindo ao Back-end Stetic-Cli!' });
    })

    app.use(
        express.json(),
        usuarios,
        agendamentos
    )
}

export default routes;

