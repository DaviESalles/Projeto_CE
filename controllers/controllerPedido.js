const db = require('../config/db_sequelize');

module.exports = {
    // GET: Exibe o formulário de criação de pedido com clientes e produtos
    async getCreate(req, res) {
        try {
            const clientes = await db.Cliente.findAll();
            const produtos = await db.Produto.findAll();

            res.render('pedido/pedidoCreate', {
                clientes: clientes.map(c => c.toJSON()),
                produtos: produtos.map(p => p.toJSON())
            });
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },

    // POST: Cria um novo pedido
    async postCreate(req, res) {
        try {
            const { clienteId, produtoId, quantidade } = req.body;

            const produto = await db.Produto.findByPk(produtoId);
            if (!produto) return res.status(400).send('Produto não encontrado');

            const valorTotal = produto.preco * quantidade;

            await db.Pedido.create({
                clienteId,
                produtoId,
                quantidade,
                valorTotal
            });

            res.redirect('/pedidoList');
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },

    // GET: Lista todos os pedidos
    async getList(req, res) {
        try {
            const pedidos = await db.Pedido.findAll({
                include: [db.Cliente, db.Produto]
            });

            res.render('pedido/pedidoList', {
                pedidos: pedidos.map(p => p.toJSON())
            });
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },

    // GET: Formulário de edição de pedido
async getUpdate(req, res) {
    try {
        const clientes = await db.Cliente.findAll();
        const produtos = await db.Produto.findAll();
        const pedido = await db.Pedido.findByPk(req.params.id);

        // Marca o cliente selecionado
        const clientesFormatados = clientes.map(cliente => {
            let c = cliente.toJSON();
            if (c.id === pedido.clienteId) c.selected = true;
            return c;
        });

        // Marca o produto selecionado
        const produtosFormatados = produtos.map(produto => {
            let p = produto.toJSON();
            if (p.id === pedido.produtoId) p.selected = true;
            return p;
        });

        res.render('pedido/pedidoUpdate', {
            pedido: pedido.toJSON(),
            clientes: clientesFormatados,
            produtos: produtosFormatados
        });

    } catch (err) {
        console.log(err);
    }
}
,

    // POST: Atualiza um pedido existente
    async postUpdate(req, res) {
        try {
            const { id, clienteId, produtoId, quantidade } = req.body;

            const produto = await db.Produto.findByPk(produtoId);
            if (!produto) return res.status(400).send('Produto não encontrado');

            const valorTotal = produto.preco * quantidade;

            await db.Pedido.update(
                { clienteId, produtoId, quantidade, valorTotal },
                { where: { id } }
            );

            res.redirect('/pedidoList');
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },

    // GET: Exclui um pedido pelo ID
    async getDelete(req, res) {
        try {
            await db.Pedido.destroy({ where: { id: req.params.id } });
            res.redirect('/pedidoList');
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
};