// Importa o framework Express
const express = require('express');

// Cria um roteador separado para o carrinho
const router = express.Router();

// Importa a conexão com o banco de dados e acessa o model Produto
const db = require('../config/db_sequelize');
const Produto = db.Produto;

// ==============================
// ROTA: Visualizar Carrinho
// ==============================
router.get('/', (req, res) => {
  // Recupera o carrinho da sessão ou inicializa vazio
  const carrinho = req.session.carrinho || [];

  // Calcula subtotal e quantidade total
  const subtotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const quantidadeTotal = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  // Define valor de frete: R$ 5 por item se subtotal for até R$ 100
  let frete = 0;
  if (subtotal <= 100) {
    frete = quantidadeTotal * 5;
  }

  const total = subtotal + frete;

  // Renderiza a página do carrinho com os dados calculados
  res.render('carrinho/carrinho', { carrinho, subtotal, frete, total });
});

// ==============================
// ROTA: Adicionar Produto ao Carrinho
// ==============================
router.post('/adicionar/:id', async (req, res) => {
  const idProduto = req.params.id;

  // Busca o produto pelo ID
  const produto = await Produto.findByPk(idProduto);

  // Se produto não encontrado, retorna erro
  if (!produto) {
    return res.status(404).send('Produto não encontrado');
  }

  // Inicializa o carrinho na sessão, se não existir
  if (!req.session.carrinho) req.session.carrinho = [];

  const carrinho = req.session.carrinho;

  // Verifica se o produto já está no carrinho
  const index = carrinho.findIndex(p => p.idProduto == idProduto);

  if (index >= 0) {
    // Se já existe, aumenta a quantidade
    carrinho[index].quantidade += 1;
  } else {
    // Caso contrário, adiciona novo item ao carrinho
    carrinho.push({
      idProduto: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1
    });
  }

  // Redireciona para a página do carrinho
  res.redirect('/carrinho');
});

// ==============================
// ROTA: Remover Produto do Carrinho
// ==============================
router.post('/remover/:id', (req, res) => {
  const idProduto = req.params.id;
  const carrinho = req.session.carrinho || [];

  // Remove o produto pelo ID
  req.session.carrinho = carrinho.filter(p => p.idProduto != idProduto);

  res.redirect('/carrinho');
});

// ==============================
// ROTA: Página de Pagamento (Checkout)
// ==============================
router.post('/checkout', (req, res) => {
  const carrinho = req.session.carrinho || [];

  // Se o carrinho estiver vazio, volta para a página do carrinho
  if (carrinho.length === 0) {
    return res.redirect('/carrinho');
  }

  // Calcula subtotal, quantidade total e frete
  const subtotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const quantidadeTotal = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  let frete = 0;
  if (subtotal < 100) {
    frete = quantidadeTotal * 5;
  }

  const total = subtotal + frete;

  // Renderiza a página de pagamento
  res.render('checkout/pagamento', { carrinho, subtotal, frete, total });
});

// ==============================
// ROTA: Finalizar Pedido e Salvar no Banco
// ==============================
router.post('/checkout/finalizar', async (req, res) => {
  const carrinho = req.session.carrinho || [];
  const clienteId = req.session.clienteId;

  // Logs úteis para depuração
  console.log("Cliente ID:", clienteId);
  console.log("Carrinho:", carrinho);

  // Verifica se o cliente está logado e se o carrinho não está vazio
  if (!clienteId || carrinho.length === 0) {
    return res.redirect('/carrinho');
  }

  try {
    // Cria um pedido no banco para cada item do carrinho
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

    // Limpa o carrinho após finalização
    req.session.carrinho = [];

    // Simula número de pedido gerado
    const pedidoId = Math.floor(Math.random() * 1000000);

    // Renderiza página de sucesso do pedido
    res.render('checkout/sucesso', { pedidoId });

  } catch (err) {
    console.error("❌ Erro ao salvar pedido:", err);
    res.status(500).send("Erro ao finalizar o pedido");
  }
});

// Exporta o roteador para uso na aplicação principal
module.exports = router;
