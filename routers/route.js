// Importa o framework Express e cria o roteador
const express = require('express');
const route = express.Router();

// Importa a configuração do banco de dados
const db = require('../config/db_sequelize');

// Importa os controllers de cada entidade
const controllerCliente = require('../controllers/controllerCliente');
const controllerVendedor = require('../controllers/controllerVendedor');
const controllerCategoria = require('../controllers/controllerCategoria');
const controllerProduto = require('../controllers/controllerProduto');
const controllerPedido = require('../controllers/controllerPedido');

// Importa os middlewares de controle de sessão
const middlewares = require('../middlewares/middlewares');

// =============================
// === Rotas gerais de acesso ==
// =============================

// Rota para a página inicial do sistema (home)
// Redireciona o usuário com base no perfil logado
route.get("/home", function (req, res) {
    if (req.session.perfil === 'vendedor') {
        res.redirect('/vendedor/home'); // Vendedor vai para home do vendedor
    } else if (req.session.perfil === 'cliente') {
        res.render('home'); // Cliente vai para home padrão
    } else {
        res.redirect('/'); // Não logado volta para tela de login
    }
});

// Rota específica da home do vendedor (somente com sessão ativa)
route.get("/vendedor/home", middlewares.sessionControlVendedor, function (req, res) {
    res.render('vendedor/home');
});

// =============================
// === Rotas de Cliente ========
// =============================

// Acesso inicial (tela de login do cliente)
route.get("/", controllerCliente.getLoginCliente);
// Envio do formulário de login
route.post("/login", controllerCliente.postLoginCliente);
// Logout do cliente
route.get("/logout", controllerCliente.getLogoutCliente);

// Cadastro de cliente
route.get("/clienteCreate", middlewares.sessionControlCliente, controllerCliente.getCreate);
route.post("/clienteCreate", middlewares.sessionControlCliente, controllerCliente.postCreate);

// Listagem, edição e exclusão de clientes
route.get("/clienteList", middlewares.sessionControlCliente, controllerCliente.getList);
route.get("/clienteUpdate/:id", middlewares.sessionControlCliente, controllerCliente.getUpdate);
route.post("/clienteUpdate", middlewares.sessionControlCliente, controllerCliente.postUpdate);
route.get("/clienteDelete/:id", middlewares.sessionControlCliente, controllerCliente.getDelete);

// =============================
// === Rotas de Vendedor =======
// =============================

// Login e logout do vendedor
route.get("/vendedor/login", controllerVendedor.getLoginVendedor);
route.post("/vendedor/login", controllerVendedor.postLoginVendedor);
route.get("/vendedor/logout", controllerVendedor.getLogoutVendedor);

// Cadastro de vendedor
route.get("/vendedorCreate", middlewares.sessionControlVendedor, controllerVendedor.getCreate);
route.post("/vendedorCreate", middlewares.sessionControlVendedor, controllerVendedor.postCreate);

// Listagem, edição e exclusão de vendedores
route.get("/vendedorList", middlewares.sessionControlVendedor, controllerVendedor.getList);
route.get("/vendedorUpdate/:id", middlewares.sessionControlVendedor, controllerVendedor.getUpdate);
route.post("/vendedorUpdate", middlewares.sessionControlVendedor, controllerVendedor.postUpdate);
route.get("/vendedorDelete/:id", middlewares.sessionControlVendedor, controllerVendedor.getDelete);

// =============================
// === Acesso comum a produtos, etc.
// =============================

// Permite que clientes acessem listas de vendedores, categorias e produtos
route.get("/vendedorList", middlewares.sessionControlCliente, controllerVendedor.getList);
route.get("/categoriaList", middlewares.sessionControlCliente, controllerCategoria.getList);
route.get("/produtoList", middlewares.sessionControlCliente, controllerProduto.getList);

// =============================
// === Rotas de Categoria ======
// =============================

// CRUD de categorias (somente acessível por vendedores)
route.get("/categoriaCreate", middlewares.sessionControlVendedor, controllerCategoria.getCreate);
route.post("/categoriaCreate", middlewares.sessionControlVendedor, controllerCategoria.postCreate);
route.get("/categoriaUpdate/:id", middlewares.sessionControlVendedor, controllerCategoria.getUpdate);
route.post("/categoriaUpdate", middlewares.sessionControlVendedor, controllerCategoria.postUpdate);
route.get("/categoriaDelete/:id", middlewares.sessionControlVendedor, controllerCategoria.getDelete);

// =============================
// === Rotas de Produto ========
// =============================

// CRUD de produtos (somente para vendedores)
route.get("/produtoCreate", middlewares.sessionControlVendedor, controllerProduto.getCreate);
route.post("/produtoCreate", middlewares.sessionControlVendedor, controllerProduto.postCreate);
route.get("/produtoUpdate/:id", middlewares.sessionControlVendedor, controllerProduto.getUpdate);
route.post("/produtoUpdate", middlewares.sessionControlVendedor, controllerProduto.postUpdate);
route.get("/produtoDelete/:id", middlewares.sessionControlVendedor, controllerProduto.getDelete);

// =============================
// === Pedidos - Cliente =======
// =============================

// Clientes podem criar e visualizar seus pedidos
route.get("/pedidoCreate", middlewares.sessionControlCliente, controllerPedido.getCreate);
route.post("/pedidoCreate", middlewares.sessionControlCliente, controllerPedido.postCreate);
route.get("/pedidoList", middlewares.sessionControlCliente, controllerPedido.getList);

// =============================
// === Pedidos - Vendedor ======
// =============================

// Vendedores podem criar, visualizar, editar e excluir pedidos
route.get("/vendedor/pedidoCreate", middlewares.sessionControlVendedor, controllerPedido.getCreate);
route.post("/vendedor/pedidoCreate", middlewares.sessionControlVendedor, controllerPedido.postCreate);
route.get("/vendedor/pedidoList", middlewares.sessionControlVendedor, controllerPedido.getList);
route.get("/vendedor/pedidoUpdate/:id", middlewares.sessionControlVendedor, controllerPedido.getUpdate);
route.post("/vendedor/pedidoUpdate", middlewares.sessionControlVendedor, controllerPedido.postUpdate);
route.get("/vendedor/pedidoDelete/:id", middlewares.sessionControlVendedor, controllerPedido.getDelete);

// =============================
// === Exporta o roteador ======
// =============================

// Exporta todas as rotas para serem usadas no app principal
module.exports = route;




// ============================================
// Sincroniza banco e cria registros iniciais
// ============================================

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('{ force: true }');
// });

    // // Cria um vendedor admin
    // db.Vendedor.create({
    //     login: 'adm@adm.com',
    //     senha: '1234',
    //     tipo: 1,
    //     cpf: '000.000.000-01',
    //     endereco: 'rua admin',
    //     especialidade: 'Bolo de fubá'
    // });

    // // Cria um cliente de teste
    // db.Cliente.create({
    //     login: 'cli@cli.com',
    //     senha: '123',
    //     tipo: 6,
    //     cpf: '000.000.000-02',
    //     endereco: 'rua teste',
    //     produto_preferido: 'Bolo de fubá'
    // });
