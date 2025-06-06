const db = require('../config/db_sequelize');
const path = require('path');

module.exports = {

    // ============================  
    // === LOGIN DE CLIENTE =======  
    // ============================  

    async getLoginCliente(req, res) {
        // Renderiza o login de cliente
        res.render('cliente/login', { layout: 'noMenu.handlebars' });
    },

    async postLoginCliente(req, res) {
        db.Cliente.findAll({ where: { login: req.body.login, senha: req.body.senha } })
        .then(clientes => {
            if (clientes.length > 0) {
                req.session.login = req.body.login;
                req.session.tipo = clientes[0].dataValues.tipo; 
                req.session.perfil = 'cliente';  // Perfil do usuário definido como cliente
                res.locals.login = req.body.login;

                res.render('home');  // Pode mudar para dashboard do cliente, se quiser
            } else {
                res.redirect('/cliente/home');
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    async getLogoutCliente(req, res) {
        req.session.destroy();
        res.redirect('/');
    },

    async getCreate(req, res) {
        res.render('cliente/clienteCreate');
    },

    async postCreate(req, res) {
        db.Cliente.create(req.body)
        .then(() => {
            res.redirect('/home');
        })
        .catch((err) => {
            console.log(err);
        });
    },

    async getList(req, res) {
        db.Cliente.findAll()
        .then(clientes => {
            res.render('cliente/clienteList', { clientes: clientes.map(user => user.toJSON()) });
        })
        .catch((err) => {
            console.log(err);
        });
    },

    async getUpdate(req, res) {
        await db.Cliente.findByPk(req.params.id)
        .then(cliente => {
            res.render('cliente/clienteUpdate', { cliente: cliente.dataValues });
        })
        .catch(err => {
            console.log(err);
        });
    },

    async postUpdate(req, res) {
        await db.Cliente.update(req.body, { where: { id: req.body.id } })
        .then(() => {
            res.render('home');
        })
        .catch(err => {
            console.log(err);
        });
    },

    async getDelete(req, res) {
        await db.Cliente.destroy({ where: { id: req.params.id } })
        .then(() => {
            res.render('home');
        })
        .catch(err => {
            console.log(err);
        });
    }
}
