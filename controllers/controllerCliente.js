const db = require('../config/db_sequelize');
const bcrypt = require('bcrypt');

module.exports = {
    // === LOGIN DE CLIENTE ===
    async getLoginCliente(req, res) {
        res.render('cliente/login', { layout: 'noMenu.handlebars' });
    },

    async postLoginCliente(req, res) {
        try {
            const cliente = await db.Cliente.findOne({ where: { login: req.body.login } });

            if (!cliente) {
                console.log("Cliente não encontrado");
                return res.redirect('/cliente/home');
            }

            const senhaCorreta = await bcrypt.compare(req.body.senha, cliente.senha);

            if (senhaCorreta) {
                // Salva dados do cliente na sessão
                req.session.clienteId = cliente.id;
                req.session.login = cliente.login;
                req.session.tipo = cliente.tipo;
                req.session.perfil = 'cliente';
                res.locals.login = cliente.login;

                console.log("Login efetuado. Cliente ID:", cliente.id);

                return res.redirect('/home');
            } else {
                console.log("Senha incorreta");
                return res.redirect('/cliente/home');
            }
        } catch (err) {
            console.log("Erro no login do cliente:", err);
            return res.redirect('/cliente/home');
        }
    },

    async getLogoutCliente(req, res) {
        req.session.destroy();
        res.redirect('/');
    },

    async getCreate(req, res) {
        res.render('cliente/clienteCreate');
    },

    async postCreate(req, res) {
        try {
            const hash = await bcrypt.hash(req.body.senha, 10);
            req.body.senha = hash;

            await db.Cliente.create(req.body);
            res.redirect('/home');
        } catch (err) {
            console.log("Erro ao criar cliente:", err);
        }
    },

    async getList(req, res) {
        try {
            const clientes = await db.Cliente.findAll();
            res.render('cliente/clienteList', {
                clientes: clientes.map(user => user.toJSON())
            });
        } catch (err) {
            console.log("Erro ao listar clientes:", err);
        }
    },

    async getUpdate(req, res) {
        try {
            const cliente = await db.Cliente.findByPk(req.params.id);
            res.render('cliente/clienteUpdate', { cliente: cliente.dataValues });
        } catch (err) {
            console.log("Erro ao carregar cliente:", err);
        }
    },

    async postUpdate(req, res) {
        try {
            if (req.body.senha) {
                const hash = await bcrypt.hash(req.body.senha, 10);
                req.body.senha = hash;
            }

            await db.Cliente.update(req.body, { where: { id: req.body.id } });
            res.render('home');
        } catch (err) {
            console.log("Erro ao atualizar cliente:", err);
        }
    },

    async getDelete(req, res) {
        try {
            await db.Cliente.destroy({ where: { id: req.params.id } });
            res.render('home');
        } catch (err) {
            console.log("Erro ao excluir cliente:", err);
        }
    }
};
