const db = require('../config/db_sequelize');

module.exports = {

    // ============================
    // === VALIDAÇÃO DE vendedor ==
    // ============================

    async getLogin(req, res) {
        // Renderiza a página de login com layout sem menu
        res.render('vendedor/login', { layout: 'noMenu.handlebars' });
    },

    async getLogout(req, res) {
        req.session.destroy();
        res.redirect('/vendedor/login');
    },

    async postLogin(req, res) {
        try {
            const vendedores = await db.Vendedor.findAll({ 
                where: { login: req.body.login, senha: req.body.senha } 
            });

            if (vendedores.length > 0) {
                req.session.vendedorLogin = req.body.login;
                req.session.perfil = 'vendedor';  // Define o perfil como vendedor
                // Redireciona para a home exclusiva do vendedor, que usa middleware para setar variáveis locais
                res.redirect('/vendedor/home');
            } else {
                res.redirect('/vendedor/login');
            }
        } catch (err) {
            console.log(err);
            res.redirect('/vendedor/login');
        }
    },

    // ============================
    // === CRUD DE VENDEDORES =====
    // ============================

    async getCreate(req, res) {
        res.render('vendedor/vendedorCreate');
    },

    async postCreate(req, res) {
        try {
            await db.Vendedor.create(req.body);
            res.redirect('/home');
        } catch (err) {
            console.log(err);
            res.redirect('/vendedorCreate');
        }
    },

    async getList(req, res) {
        try {
            const vendedores = await db.Vendedor.findAll();
            res.render('vendedor/vendedorList', { vendedores: vendedores.map(user => user.toJSON()) });
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
            await db.Vendedor.update(req.body, { where: { id: req.body.id } });
            res.redirect('/home');
        } catch (err) {
            console.log(err);
            res.redirect(`/vendedorUpdate/${req.body.id}`);
        }
    },

    async getDelete(req, res) {
        try {
            await db.Vendedor.destroy({ where: { id: req.params.id } });
            res.redirect('/home');
        } catch (err) {
            console.log(err);
            res.redirect('/home');
        }
    }
};
