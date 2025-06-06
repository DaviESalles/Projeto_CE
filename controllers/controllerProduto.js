const db = require('../config/db_sequelize');

module.exports = {
    // Rota GET para exibir o formulário de criação de produto
    async getCreate(req, res) {
        try {
            const categorias = await db.Categoria.findAll();
            const vendedores = await db.Vendedor.findAll();

            res.render('produto/produtoCreate', {
                categorias: categorias.map(c => c.toJSON()),
                vendedores: vendedores.map(v => v.toJSON())
            });
        } catch (err) {
            console.log(err);
        }
    },

    // Rota POST para criar um novo produto
    async postCreate(req, res) {
        try {
            await db.Produto.create(req.body);
            res.redirect('/home');
        } catch (err) {
            console.log(err);
        }
    },

    // Rota GET para listar todos os produtos com filtro por categoria
    async getList(req, res) {
        try {
            const categoriaId = req.query.categoriaId || null;
            const where = categoriaId ? { categoriaId } : {};

            const produtos = await db.Produto.findAll({
                where,
                include: [db.Categoria, db.Vendedor]
            });

            const categorias = await db.Categoria.findAll();

            res.render('produto/produtoList', {
                produtos: produtos.map(produto => {
                    const p = produto.toJSON();
                    p.categoriaNome = p.categoria ? p.categoria.nome : 'Sem categoria';
                    p.vendedorNome = p.vendedor ? p.vendedor.login : 'Sem vendedor';
                    return p;
                }),
                categorias: categorias.map(c => c.toJSON()),
                categoriaSelecionada: categoriaId,
                perfilCliente: req.session.perfil === 'cliente',
                admin: req.session.perfil === 'vendedor'
            });
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },

    // Rota GET para exibir formulário de edição de produto
    async getUpdate(req, res) {
        try {
            const categorias = await db.Categoria.findAll();
            const vendedores = await db.Vendedor.findAll();
            const produto = await db.Produto.findByPk(req.params.id);

            res.render('produto/produtoUpdate', {
                produto: produto.dataValues,
                categorias: categorias.map(c => c.toJSON()),
                vendedores: vendedores.map(v => v.toJSON())
            });
        } catch (err) {
            console.log(err);
        }
    },

    // Rota POST para atualizar os dados de um produto
    async postUpdate(req, res) {
        try {
            await db.Produto.update(req.body, { where: { id: req.body.id } });
            res.render('home');
        } catch (err) {
            console.log(err);
        }
    },

    // Rota GET para excluir um produto
    async getDelete(req, res) {
        try {
            await db.Produto.destroy({ where: { id: req.params.id } });
            res.render('home');
        } catch (err) {
            console.log(err);
        }
    }
};
