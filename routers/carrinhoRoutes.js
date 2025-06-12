const express = require('express');
const router = express.Router();
const db = require('../config/db_sequelize');
const Produto = db.Produto;

// Ver carrinho
router.get('/', (req, res) => {
  const carrinho = req.session.carrinho || [];

  const subtotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const quantidadeTotal = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  let frete = 0;
  if (subtotal <= 100) {
    frete = quantidadeTotal * 5;
  }

  const total = subtotal + frete;

  res.render('carrinho/carrinho', { carrinho, subtotal, frete, total });
});

// Adicionar produto ao carrinho
router.post('/adicionar/:id', async (req, res) => {
  const idProduto = req.params.id;
  const produto = await Produto.findByPk(idProduto);

  if (!produto) {
    return res.status(404).send('Produto não encontrado');
  }

  if (!req.session.carrinho) req.session.carrinho = [];

  const carrinho = req.session.carrinho;
  const index = carrinho.findIndex(p => p.idProduto == idProduto);

  if (index >= 0) {
    carrinho[index].quantidade += 1;
  } else {
    carrinho.push({
      idProduto: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1
    });
  }

  res.redirect('/carrinho');
});

// Remover produto do carrinho
router.post('/remover/:id', (req, res) => {
  const idProduto = req.params.id;
  const carrinho = req.session.carrinho || [];

  req.session.carrinho = carrinho.filter(p => p.idProduto != idProduto);

  res.redirect('/carrinho');
});

// Página de pagamento
router.post('/checkout', (req, res) => {
  const carrinho = req.session.carrinho || [];

  if (carrinho.length === 0) {
    return res.redirect('/carrinho');
  }

  const subtotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const quantidadeTotal = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  let frete = 0;
  if (subtotal < 100) {
    frete = quantidadeTotal * 5;
  }

  const total = subtotal + frete;

  res.render('checkout/pagamento', { carrinho, subtotal, frete, total });
});

// Finalizar pedido e salvar no banco
router.post('/checkout/finalizar', async (req, res) => {
  const carrinho = req.session.carrinho || [];
  const clienteId = req.session.clienteId;

  // Logs para debug
  console.log("Cliente ID:", clienteId);
  console.log("Carrinho:", carrinho);

  if (!clienteId || carrinho.length === 0) {
    return res.redirect('/carrinho');
  }

  try {
    for (let item of carrinho) {
      console.log("Salvando pedido com:", {
        clienteId: clienteId,
        produtoId: item.idProduto,
        quantidade: item.quantidade,
        valorTotal: item.preco * item.quantidade
      });

      await db.Pedido.create({
        clienteId: clienteId,
        produtoId: item.idProduto,
        quantidade: item.quantidade,
        valorTotal: item.preco * item.quantidade
      });
    }

    req.session.carrinho = [];

    const pedidoId = Math.floor(Math.random() * 1000000); // Simulado
    res.render('checkout/sucesso', { pedidoId });

  } catch (err) {
    console.error("❌ Erro ao salvar pedido:", err);
    res.status(500).send("Erro ao finalizar o pedido");
  }
});

module.exports = router;
