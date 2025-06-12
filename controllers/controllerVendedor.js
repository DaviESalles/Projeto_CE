// Importa a configuração de conexão com o banco de dados (Sequelize)
const db = require('../config/db_sequelize');

// Importa o módulo 'path' do Node.js (não utilizado diretamente neste arquivo)
const path = require('path');

// Importa o módulo 'bcrypt' para criptografar e comparar senhas
const bcrypt = require('bcrypt');

module.exports = {
    // ========== LOGIN VENDEDOR ==========

    // Rota GET: Exibe o formulário de login do vendedor
    async getLoginVendedor(req, res) {
        res.render('vendedor/login', { layout: 'noMenu.handlebars' }); // Usa layout sem menu
    },

    // Rota POST: Realiza a autenticação do vendedor
    async postLoginVendedor(req, res) {
        try {
            // Procura o vendedor com o login informado
            const vendedor = await db.Vendedor.findOne({ where: { login: req.body.login } });

            // Se não encontrado, redireciona para a página de login
            if (!vendedor) return res.redirect('/vendedor/login');

            // Compara a senha informada com o hash armazenado no banco
            const senhaValida = await bcrypt.compare(req.body.senha, vendedor.senha);
            if (!senhaValida) return res.redirect('/vendedor/login');

            // Armazena dados do vendedor na sessão
            req.session.vendedorLogin = vendedor.login;
            req.session.perfil = 'vendedor';
            res.locals.login = vendedor.login;

            // Redireciona para a home do vendedor
            return res.render('vendedor/home');

        } catch (err) {
            console.log(err);
            return res.redirect('/vendedor/login'); // Em caso de erro, retorna para login
        }
    },

    // Rota GET: Encerra a sessão do vendedor e redireciona para a home pública
    async getLogoutVendedor(req, res) {
        req.session.destroy(); // Destroi os dados da sessão
        res.redirect('/');
    },

    // Rota GET: Exibe o formulário de cadastro de novo vendedor
    async getCreate(req, res) {
        res.render('vendedor/vendedorCreate');
    },

    // Rota POST: Cria um novo vendedor no banco de dados
    async postCreate(req, res) {
        try {
            // Criptografa a senha antes de salvar
            const hash = await bcrypt.hash(req.body.senha, 10);
            req.body.senha = hash;

            // Cria o registro do vendedor
            await db.Vendedor.create(req.body);
            res.redirect('/home'); // Redireciona após cadastro
        } catch (err) {
            console.log(err);
        }
    },

    // Rota GET: Lista todos os vendedores cadastrados
    async getList(req, res) {
        try {
            const vendedores = await db.Vendedor.findAll(); // Busca todos os vendedores
            res.render('vendedor/vendedorList', {
                vendedores: vendedores.map(v => v.toJSON()) // Converte dados para JSON simples
            });
        } catch (err) {
            console.log(err);
        }
    },

    // Rota GET: Carrega os dados de um vendedor para exibir no formulário de edição
    async getUpdate(req, res) {
        try {
            const vendedor = await db.Vendedor.findByPk(req.params.id); // Busca pelo ID
            res.render('vendedor/vendedorUpdate', { vendedor: vendedor.dataValues }); // Envia os dados para a view
        } catch (err) {
            console.log(err);
        }
    },

    // Rota POST: Atualiza os dados de um vendedor existente
    async postUpdate(req, res) {
        try {
            // Se houver nova senha, criptografa antes de atualizar
            if (req.body.senha) {
                const hash = await bcrypt.hash(req.body.senha, 10);
                req.body.senha = hash;
            }

            // Atualiza os dados com base no ID
            await db.Vendedor.update(req.body, { where: { id: req.body.id } });
            res.render('home'); // Redireciona após a atualização
        } catch (err) {
            console.log(err);
        }
    },

    // Rota GET: Exclui um vendedor com base no ID
    async getDelete(req, res) {
        try {
            await db.Vendedor.destroy({ where: { id: req.params.id } }); // Remove o vendedor do banco
            res.render('home'); // Redireciona após exclusão
        } catch (err) {
            console.log(err);
        }
    }
};
