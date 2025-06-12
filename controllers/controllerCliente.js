// Importa a conexão com o banco de dados Sequelize
const db = require('../config/db_sequelize');

// Importa o módulo 'bcrypt' para criptografar e comparar senhas
const bcrypt = require('bcrypt');

module.exports = {
    // === LOGIN DE CLIENTE ===

    // Rota GET: Exibe o formulário de login para o cliente
    async getLoginCliente(req, res) {
        res.render('cliente/login', { layout: 'noMenu.handlebars' }); // Renderiza com layout sem menu
    },

    // Rota POST: Processa o login do cliente
    async postLoginCliente(req, res) {
        try {
            // Procura o cliente pelo campo "login"
            const cliente = await db.Cliente.findOne({ where: { login: req.body.login } });

            // Se cliente não encontrado, redireciona
            if (!cliente) {
                console.log("Cliente não encontrado");
                return res.redirect('/cliente/home');
            }

            // Compara a senha digitada com o hash armazenado
            const senhaCorreta = await bcrypt.compare(req.body.senha, cliente.senha);

            if (senhaCorreta) {
                // Se a senha estiver correta, salva os dados na sessão
                req.session.clienteId = cliente.id;
                req.session.login = cliente.login;
                req.session.tipo = cliente.tipo;
                req.session.perfil = 'cliente'; // Define o perfil como cliente
                res.locals.login = cliente.login;

                console.log("Login efetuado. Cliente ID:", cliente.id);

                // Redireciona para a home
                return res.redirect('/home');
            } else {
                // Senha incorreta
                console.log("Senha incorreta");
                return res.redirect('/cliente/home');
            }
        } catch (err) {
            // Trata qualquer erro inesperado durante o login
            console.log("Erro no login do cliente:", err);
            return res.redirect('/cliente/home');
        }
    },

    // Rota GET: Efetua o logout do cliente
    async getLogoutCliente(req, res) {
        req.session.destroy(); // Encerra a sessão do cliente
        res.redirect('/');     // Redireciona para a página inicial
    },

    // Rota GET: Exibe o formulário de cadastro de cliente
    async getCreate(req, res) {
        res.render('cliente/clienteCreate');
    },

    // Rota POST: Cria um novo cliente no banco de dados
    async postCreate(req, res) {
        try {
            // Criptografa a senha antes de salvar
            const hash = await bcrypt.hash(req.body.senha, 10);
            req.body.senha = hash;

            // Cria o cliente com os dados enviados
            await db.Cliente.create(req.body);
            res.redirect('/home'); // Redireciona para a home
        } catch (err) {
            console.log("Erro ao criar cliente:", err);
        }
    },

    // Rota GET: Lista todos os clientes cadastrados
    async getList(req, res) {
        try {
            const clientes = await db.Cliente.findAll(); // Busca todos os clientes
            res.render('cliente/clienteList', {
                clientes: clientes.map(user => user.toJSON()) // Converte os dados para JSON simples
            });
        } catch (err) {
            console.log("Erro ao listar clientes:", err);
        }
    },

    // Rota GET: Carrega os dados de um cliente específico para edição
    async getUpdate(req, res) {
        try {
            const cliente = await db.Cliente.findByPk(req.params.id); // Busca cliente pelo ID
            res.render('cliente/clienteUpdate', { cliente: cliente.dataValues }); // Envia os dados para a view
        } catch (err) {
            console.log("Erro ao carregar cliente:", err);
        }
    },

    // Rota POST: Atualiza os dados de um cliente
    async postUpdate(req, res) {
        try {
            // Se uma nova senha foi enviada, criptografa antes de atualizar
            if (req.body.senha) {
                const hash = await bcrypt.hash(req.body.senha, 10);
                req.body.senha = hash;
            }

            // Atualiza o cliente com base no ID
            await db.Cliente.update(req.body, { where: { id: req.body.id } });
            res.render('home'); // Redireciona após atualização
        } catch (err) {
            console.log("Erro ao atualizar cliente:", err);
        }
    },

    // Rota GET: Exclui um cliente com base no ID
    async getDelete(req, res) {
        try {
            await db.Cliente.destroy({ where: { id: req.params.id } }); // Remove o cliente
            res.render('home'); // Redireciona após exclusão
        } catch (err) {
            console.log("Erro ao excluir cliente:", err);
        }
    }
};
