// Importa a conexão com o banco de dados Sequelize
const db = require('../config/db_sequelize');

module.exports = {
    // GET: Exibe o formulário de criação de pedido
    // Busca todos os clientes e produtos do banco para montar os selects do formulário
    async getCreate(req, res) {
        try {
            const clientes = await db.Cliente.findAll(); // Busca todos os clientes
            const produtos = await db.Produto.findAll(); // Busca todos os produtos

            // Renderiza o formulário de criação, passando os dados formatados
            res.render('pedido/pedidoCreate', {
                clientes: clientes.map(c => c.toJSON()),
                produtos: produtos.map(p => p.toJSON())
            });
        } catch (err) {
            console.log(err);
            res.sendStatus(500); // Retorna erro 500 em caso de falha
        }
    },

    // POST: Cria um novo pedido no banco de dados
    async postCreate(req, res) {
        try {
            const { clienteId, produtoId, quantidade } = req.body;

            // Busca o produto selecionado para obter o preço
            const produto = await db.Produto.findByPk(produtoId);
            if (!produto) return res.status(400).send('Produto não encontrado');

            // Calcula o valor total do pedido (preço * quantidade)
            const valorTotal = produto.preco * quantidade;

            // Cria o novo pedido
            await db.Pedido.create({
                clienteId,
                produtoId,
                quantidade,
                valorTotal
            });

            res.redirect('/pedidoList'); // Redireciona para a listagem de pedidos
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },

    // GET: Lista todos os pedidos cadastrados
    async getList(req, res) {
        try {
            // Busca todos os pedidos, incluindo os dados do cliente e produto associados
            const pedidos = await db.Pedido.findAll({
                include: [db.Cliente, db.Produto]
            });

            // Renderiza a lista de pedidos com os dados formatados
            res.render('pedido/pedidoList', {
                pedidos: pedidos.map(p => p.toJSON())
            });
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },

    // GET: Exibe o formulário de edição de um pedido existente
    async getUpdate(req, res) {
        try {
            const clientes = await db.Cliente.findAll();   // Busca todos os clientes
            const produtos = await db.Produto.findAll();   // Busca todos os produtos
            const pedido = await db.Pedido.findByPk(req.params.id); // Busca o pedido atual pelo ID

            // Marca o cliente atual como selecionado
            const clientesFormatados = clientes.map(cliente => {
                let c = cliente.toJSON();
                if (c.id === pedido.clienteId) c.selected = true;
                return c;
            });

            // Marca o produto atual como selecionado
            const produtosFormatados = produtos.map(produto => {
                let p = produto.toJSON();
                if (p.id === pedido.produtoId) p.selected = true;
                return p;
            });

            // Renderiza o formulário de edição com os dados do pedido
            res.render('pedido/pedidoUpdate', {
                pedido: pedido.toJSON(),
                clientes: clientesFormatados,
                produtos: produtosFormatados
            });

        } catch (err) {
            console.log(err);
        }
    },

    // POST: Atualiza um pedido existente no banco
    async postUpdate(req, res) {
        try {
            const { id, clienteId, produtoId, quantidade } = req.body;

            // Busca o produto atualizado para calcular o novo valor total
            const produto = await db.Produto.findByPk(produtoId);
            if (!produto) return res.status(400).send('Produto não encontrado');

            const valorTotal = produto.preco * quantidade;

            // Atualiza o pedido com os novos dados
            await db.Pedido.update(
                { clienteId, produtoId, quantidade, valorTotal },
                { where: { id } }
            );

            res.redirect('/pedidoList'); // Redireciona para a listagem após atualização
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },

    // GET: Exclui um pedido com base no ID
    async getDelete(req, res) {
        try {
            await db.Pedido.destroy({ where: { id: req.params.id } }); // Remove o pedido do banco
            res.redirect('/pedidoList'); // Redireciona após a exclusão
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
};
