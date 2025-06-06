const express = require('express');
const router = express.Router();
const { Produto } = require('../models/relational/produto'); // ajuste o caminho se necessário

// Ver carrinho
router.get('/', (req, res) => {
  const carrinho = req.session.carrinho || [];
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  res.render('carrinho', { carrinho, total });
});

// Adicionar produto
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

// Remover produto
router.post('/remover/:id', (req, res) => {
  const idProduto = req.params.id;
  const carrinho = req.session.carrinho || [];

  req.session.carrinho = carrinho.filter(p => p.idProduto != idProduto);

  res.redirect('/carrinho');
});

module.exports = router;
