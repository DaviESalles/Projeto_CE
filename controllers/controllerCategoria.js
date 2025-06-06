// Importa o módulo de conexão com o banco de dados relacional (Sequelize)
const db = require('../config/db_sequelize');

// Importa o módulo 'path' do Node.js (não está sendo usado neste arquivo, pode ser removido)
const path = require('path');

module.exports = {
    // Rota GET para exibir o formulário de criação de uma nova categoria
    async getCreate(req, res) {
        res.render('categoria/categoriaCreate'); // Renderiza a view handlebars de criação
    },

    // Rota POST para criar uma nova categoria no banco de dados
    async postCreate(req, res) {
        db.Categoria.create(req.body) // Cria a categoria com os dados enviados pelo formulário
            .then(() => {
                res.redirect('/home'); // Redireciona para a home após a criação
            })
            .catch((err) => {
                console.log(err); // Exibe erros no console (poderia ser tratado melhor em produção)
            });
    },

    // Rota GET para listar todas as categorias
    async getList(req, res) {
        db.Categoria.findAll() // Busca todas as categorias no banco
            .then(categorias => {
                // Renderiza a view de listagem, convertendo os dados em JSON simples
                res.render('categoria/categoriaList', { categorias: categorias.map(catg => catg.toJSON()) });
            })
            .catch((err) => {
                console.log(err);
            });
    },

    // Rota GET para carregar os dados da categoria selecionada e exibir o formulário de edição
    async getUpdate(req, res) {
        await db.Categoria.findByPk(req.params.id) // Busca a categoria pelo ID da URL
            .then(categoria => 
                res.render('categoria/categoriaUpdate', { categoria: categoria.dataValues }) // Passa os dados para a view de edição
            )
            .catch(function (err) {
                console.log(err);
            });
    },

    // Rota POST para atualizar os dados da categoria
    async postUpdate(req, res) {
        await db.Categoria.update(req.body, { where: { id: req.body.id } }) // Atualiza a categoria com base no ID
            .then(
                res.render('home') // Após a atualização, renderiza a página 'home'
            )
            .catch(function (err) {
                console.log(err);
            });
    },

    // Rota GET para excluir uma categoria com base no ID
    async getDelete(req, res) {
        await db.Categoria.destroy({ where: { id: req.params.id } }) // Deleta a categoria pelo ID
            .then(
                res.render('home') // Após a exclusão, renderiza a página 'home'
            )
            .catch(err => {
                console.log(err);
            });
    }
}
