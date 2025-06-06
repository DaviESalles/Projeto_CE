const express = require('express');
const db = require('../config/db_sequelize');

const controllerCliente = require('../controllers/controllerCliente');
const controllerVendedor = require('../controllers/controllerVendedor');

const controllerCategoria = require('../controllers/controllerCategoria');
const controllerProduto = require('../controllers/controllerProduto');
const controllerPedido = require('../controllers/controllerPedido');

const middlewares = require('../middlewares/middlewares');

const route = express.Router();

// =============================
// === Rotas gerais de acesso ==
// =============================

route.get("/home", function (req, res) {
    if (req.session.perfil === 'vendedor') {
        res.redirect('/vendedor/home');
    } else if (req.session.perfil === 'cliente') {
        res.render('home');
    } else {
        res.redirect('/');
    }
});

route.get("/vendedor/home", middlewares.sessionControlVendedor, function (req, res) {
    res.render('vendedor/home');
});

// =============================
// === Rotas de Cliente ========
// =============================

route.get("/", controllerCliente.getLoginCliente);
route.post("/login", controllerCliente.postLoginCliente);
route.get("/logout", controllerCliente.getLogoutCliente);

route.get("/clienteCreate", middlewares.sessionControlCliente, controllerCliente.getCreate);
route.post("/clienteCreate", middlewares.sessionControlCliente, controllerCliente.postCreate);
route.get("/clienteList", middlewares.sessionControlCliente, controllerCliente.getList);
route.get("/clienteUpdate/:id", middlewares.sessionControlCliente, controllerCliente.getUpdate);
route.post("/clienteUpdate", middlewares.sessionControlCliente, controllerCliente.postUpdate);
route.get("/clienteDelete/:id", middlewares.sessionControlCliente, controllerCliente.getDelete);

// =============================
// === Rotas de Vendedor =======
// =============================
route.get("/vendedor/login", controllerVendedor.getLoginVendedor);
route.post("/vendedor/login", controllerVendedor.postLoginVendedor);
route.get("/vendedor/logout", controllerVendedor.getLogoutVendedor);

route.get("/vendedorCreate", middlewares.sessionControlVendedor, controllerVendedor.getCreate);
route.post("/vendedorCreate", middlewares.sessionControlVendedor, controllerVendedor.postCreate);
route.get("/vendedorList", middlewares.sessionControlVendedor, controllerVendedor.getList);
route.get("/vendedorUpdate/:id", middlewares.sessionControlVendedor, controllerVendedor.getUpdate);
route.post("/vendedorUpdate", middlewares.sessionControlVendedor, controllerVendedor.postUpdate);
route.get("/vendedorDelete/:id", middlewares.sessionControlVendedor, controllerVendedor.getDelete);

// =============================
// === Acesso comum a produtos, etc. ===
// =============================

route.get("/vendedorList", middlewares.sessionControlCliente, controllerVendedor.getList);
route.get("/categoriaList", middlewares.sessionControlCliente, controllerCategoria.getList);
route.get("/produtoList", middlewares.sessionControlCliente, controllerProduto.getList);

// =============================
// === Rotas de Categoria ======
// =============================

route.get("/categoriaCreate", middlewares.sessionControlVendedor, controllerCategoria.getCreate);
route.post("/categoriaCreate", middlewares.sessionControlVendedor, controllerCategoria.postCreate);
route.get("/categoriaUpdate/:id", middlewares.sessionControlVendedor, controllerCategoria.getUpdate);
route.post("/categoriaUpdate", middlewares.sessionControlVendedor, controllerCategoria.postUpdate);
route.get("/categoriaDelete/:id", middlewares.sessionControlVendedor, controllerCategoria.getDelete);

// =============================
// === Rotas de Produto ========
// =============================

route.get("/produtoCreate", middlewares.sessionControlVendedor, controllerProduto.getCreate);
route.post("/produtoCreate", middlewares.sessionControlVendedor, controllerProduto.postCreate);
route.get("/produtoUpdate/:id", middlewares.sessionControlVendedor, controllerProduto.getUpdate);
route.post("/produtoUpdate", middlewares.sessionControlVendedor, controllerProduto.postUpdate);
route.get("/produtoDelete/:id", middlewares.sessionControlVendedor, controllerProduto.getDelete);

// =============================
// === Pedidos - Cliente =======
// =============================

route.get("/pedidoCreate", middlewares.sessionControlCliente, controllerPedido.getCreate);
route.post("/pedidoCreate", middlewares.sessionControlCliente, controllerPedido.postCreate);
route.get("/pedidoList", middlewares.sessionControlCliente, controllerPedido.getList);

// =============================
// === Pedidos - Vendedor ======
// =============================

route.get("/vendedor/pedidoCreate", middlewares.sessionControlVendedor, controllerPedido.getCreate);
route.post("/vendedor/pedidoCreate", middlewares.sessionControlVendedor, controllerPedido.postCreate);
route.get("/vendedor/pedidoList", middlewares.sessionControlVendedor, controllerPedido.getList);
route.get("/vendedor/pedidoUpdate/:id", middlewares.sessionControlVendedor, controllerPedido.getUpdate);
route.post("/vendedor/pedidoUpdate", middlewares.sessionControlVendedor, controllerPedido.postUpdate);
route.get("/vendedor/pedidoDelete/:id", middlewares.sessionControlVendedor, controllerPedido.getDelete);

// =============================
// === Exporta o roteador ======
// =============================

module.exports = route;
