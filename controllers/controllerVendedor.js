const db = require('../config/db_sequelize');
const path = require('path');
const bcrypt = require('bcrypt');

module.exports = {

    // ========== LOGIN VENDEDOR ==========
    async getLoginVendedor(req, res) {
        res.render('vendedor/login', { layout: 'noMenu.handlebars' });
    },

    async postLoginVendedor(req, res) {
        try {
            const vendedor = await db.Vendedor.findOne({ where: { login: req.body.login } });

            if (!vendedor) return res.redirect('/vendedor/login');

            const senhaValida = await bcrypt.compare(req.body.senha, vendedor.senha);
            if (!senhaValida) return res.redirect('/vendedor/login');

            req.session.vendedorLogin = vendedor.login;
            req.session.perfil = 'vendedor';
            res.locals.login = vendedor.login;

            return res.render('home');

        } catch (err) {
            console.log(err);
            return res.redirect('/vendedor/login');
        }
    },

    async getLogoutVendedor(req, res) {
        req.session.destroy();
        res.redirect('/');
    },

    async getCreate(req, res) {
        res.render('vendedor/vendedorCreate');
    },

    async postCreate(req, res) {
        try {
            const hash = await bcrypt.hash(req.body.senha, 10);
            req.body.senha = hash;

            await db.Vendedor.create(req.body);
            res.redirect('/home');
        } catch (err) {
            console.log(err);
        }
    },

    async getList(req, res) {
        try {
            const vendedores = await db.Vendedor.findAll();
            res.render('vendedor/vendedorList', {
                vendedores: vendedores.map(v => v.toJSON())
            });
        } catch (err) {
            console.log(err);
        }
    },

    async getUpdate(req, res) {
        try {
            const vendedor = await db.Vendedor.findByPk(req.params.id);
            res.render('vendedor/vendedorUpdate', { vendedor: vendedor.dataValues });
        } catch (err) {
            console.log(err);
        }
    },

    async postUpdate(req, res) {
        try {
            if (req.body.senha) {
                const hash = await bcrypt.hash(req.body.senha, 10);
                req.body.senha = hash;
            }

            await db.Vendedor.update(req.body, { where: { id: req.body.id } });
            res.render('home');
        } catch (err) {
            console.log(err);
        }
    },

    async getDelete(req, res) {
        try {
            await db.Vendedor.destroy({ where: { id: req.params.id } });
            res.render('home');
        } catch (err) {
            console.log(err);
        }
    }
};
