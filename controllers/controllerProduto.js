// Importa a conexão com o banco de dados Sequelize
const db = require('../config/db_sequelize');

module.exports = {
    // Rota GET: Exibe o formulário para criação de um novo produto
    async getCreate(req, res) {
        try {
            // Busca todas as categorias e vendedores disponíveis
            const categorias = await db.Categoria.findAll();
            const vendedores = await db.Vendedor.findAll();

            // Renderiza a página de criação de produto, passando os dados para os selects
            res.render('produto/produtoCreate', {
                categorias: categorias.map(c => c.toJSON()),
                vendedores: vendedores.map(v => v.toJSON())
            });
        } catch (err) {
            console.log(err); // Em caso de erro, exibe no console
        }
    },

    // Rota POST: Cria um novo produto com base nos dados do formulário
    async postCreate(req, res) {
        try {
            await db.Produto.create(req.body); // Insere o produto no banco
            res.redirect('/home'); // Redireciona para a página inicial após o cadastro
        } catch (err) {
            console.log(err); // Exibe erro no console se falhar
        }
    },

    // Rota GET: Lista todos os produtos cadastrados
    // Se houver parâmetro de categoria, filtra por ela
    async getList(req, res) {
        try {
            const categoriaId = req.query.categoriaId || null; // Captura o filtro de categoria (se houver)
            const where = categoriaId ? { categoriaId } : {};   // Condição de filtro

            // Busca produtos com as informações da categoria e do vendedor relacionadas
            const produtos = await db.Produto.findAll({
                where,
                include: [db.Categoria, db.Vendedor]
            });

            const categorias = await db.Categoria.findAll(); // Busca todas as categorias para o filtro

            // Renderiza a lista de produtos com dados adicionais de categoria e vendedor
            res.render('produto/produtoList', {
                produtos: produtos.map(produto => {
                    const p = produto.toJSON();
                    // Define o nome da categoria e vendedor para exibição
                    p.categoriaNome = p.categoria ? p.categoria.nome : 'Sem categoria';
                    p.vendedorNome = p.vendedor ? p.vendedor.login : 'Sem vendedor';
                    return p;
                }),
                categorias: categorias.map(c => c.toJSON()),
                categoriaSelecionada: categoriaId,                    // Mantém a categoria selecionada no filtro
                perfilCliente: req.session.perfil === 'cliente',     // Define se o usuário é cliente
                admin: req.session.perfil === 'vendedor'             // Define se o usuário é vendedor
            });
        } catch (err) {
            console.log(err);
            res.sendStatus(500); // Retorna erro 500 se houver falha
        }
    },

    // Rota GET: Exibe o formulário de edição de um produto existente
    async getUpdate(req, res) {
        try {
            const categorias = await db.Categoria.findAll();             // Busca categorias
            const vendedores = await db.Vendedor.findAll();             // Busca vendedores
            const produto = await db.Produto.findByPk(req.params.id);   // Busca o produto pelo ID

            // Renderiza a view de edição com os dados atuais do produto
            res.render('produto/produtoUpdate', {
                produto: produto.dataValues,
                categorias: categorias.map(c => c.toJSON()),
                vendedores: vendedores.map(v => v.toJSON())
            });
        } catch (err) {
            console.log(err);
        }
    },

    // Rota POST: Atualiza os dados de um produto existente
    async postUpdate(req, res) {
        try {
            await db.Produto.update(req.body, { where: { id: req.body.id } }); // Atualiza no banco
            res.render('home'); // Redireciona/renderiza a página inicial
        } catch (err) {
            console.log(err);
        }
    },

    // Rota GET: Exclui um produto com base no ID
    async getDelete(req, res) {
        try {
            await db.Produto.destroy({ where: { id: req.params.id } }); // Remove o produto do banco
            res.render('home'); // Redireciona/renderiza a página inicial
        } catch (err) {
            console.log(err);
        }
    }
};
