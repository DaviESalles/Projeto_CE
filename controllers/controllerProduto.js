// Importa a configuração do Sequelize e os modelos relacionados
const db = require('../config/db_sequelize');

// Importa 'path', mas ele não está sendo utilizado — pode ser removido
const path = require('path');

module.exports = {
    // Rota GET para exibir o formulário de criação de produto
    async getCreate(req, res) {
        // Busca todas as categorias no banco para mostrar no formulário (ex: dropdown)
        var categorias = await db.Categoria.findAll();

        // Busca todas as vendedores no banco para mostrar no formulário (ex: dropdown)
        var vendedores = await db.Vendedor.findAll();

        // Renderiza o formulário de criação de produto, passando as categorias
        res.render('produto/produtoCreate', {
            categorias: categorias.map(categoria => categoria.toJSON()),

            vendedores: vendedores.map(vendedor => vendedor.toJSON())

        });
    },

    // Rota POST para criar uma nova produto no banco
    async postCreate(req, res) {
        db.Produto.create(req.body)
            .then(() => {
                res.redirect('/home'); // Redireciona para a home após salvar
            })
            .catch((err) => {
                console.log(err); // Log de erro, útil para debug
            });
    },

    // Rota GET para listar todas as produtos
    async getList(req, res) {
        db.Produto.findAll()
            .then(produtos => {
                // Renderiza a view de listagem com os dados convertidos para JSON
                res.render('produto/produtoList', {
                    produtos: produtos.map(produto => produto.toJSON())
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },

    // Rota GET para carregar a produto e exibir o formulário de edição
    async getUpdate(req, res) {
        // Busca todas as categorias para exibir no select (dropdown)
        var categorias = await db.Categoria.findAll();

        // Busca todas as vendedores para exibir no select (dropdown)
        var vendedores = await db.Vendedor.findAll();

        // Busca a produto pelo ID passado como parâmetro na URL
        await db.Produto.findByPk(req.params.id)
            .then(produto => 
                // Renderiza o formulário de edição, passando a produto e as categorias
                res.render('produto/produtoUpdate', {
                    produto: produto.dataValues,
                    categorias: categorias.map(categoria => categoria.toJSON()),
                    vendedores: vendedores.map(vendedor => vendedor.toJSON())
                })
            )
            .catch(function (err) {
                console.log(err);
            });
    },

    // Rota POST para atualizar os dados de uma produto
    async postUpdate(req, res) {
        await db.Produto.update(req.body, { where: { id: req.body.id } })
            .then(
                res.render('home') // Após a atualização, renderiza a home
            )
            .catch(function (err) {
                console.log(err);
            });
    },

    // Rota GET para excluir uma produto com base no ID
    async getDelete(req, res) {
        await db.Produto.destroy({ where: { id: req.params.id } })
            .then(
                res.render('home') // Após a exclusão, renderiza a home
            )
            .catch(err => {
                console.log(err);
            });
    }
}