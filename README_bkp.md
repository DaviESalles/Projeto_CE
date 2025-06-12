# 📦 Projeto Web - Sistema de Vendas

Este projeto é um sistema web completo desenvolvido com **Node.js**, **Express**, **Sequelize** e **Handlebars**, com o objetivo de gerenciar produtos, pedidos, clientes, vendedores e categorias.

## 🚀 Funcionalidades
- Cadastro e autenticação de clientes e vendedores
- Gerenciamento de produtos e categorias
- Carrinho de compras com fluxo de checkout
- Criação, listagem e atualização de pedidos
- Interface separada para vendedor e cliente

## 📁 Estrutura de Pastas e Arquivos

### `bkp_proj`
- `.gitignore`
- `app.js`
- `atsenh.js`
- `package-lock.json`
- `package.json`

### `bkp_proj/config`
- `db_sequelize.js`

### `bkp_proj/controllers`
- `controllerCategoria.js`
- `controllerCliente.js`
- `controllerPedido.js`
- `controllerProduto.js`
- `controllerVendedor.js`

### `bkp_proj/middlewares`
- `middlewares.js`

### `bkp_proj/models/relational`
- `categoria.js`
- `cliente.js`
- `pedido.js`
- `produto.js`
- `vendedor.js`

### `bkp_proj/routers`
- `carrinhoRoutes.js`
- `route.js`

### `bkp_proj/views`
- `home.handlebars`

### `bkp_proj/views/carrinho`
- `carrinho.handlebars`

### `bkp_proj/views/categoria`
- `categoriaCreate.handlebars`
- `categoriaList.handlebars`
- `categoriaUpdate.handlebars`

### `bkp_proj/views/checkout`
- `checkout.handlebars`
- `pagamento.handlebars`
- `sucesso.handlebars`

### `bkp_proj/views/cliente`
- `clienteCreate.handlebars`
- `clienteList.handlebars`
- `clienteUpdate.handlebars`
- `login.handlebars`

### `bkp_proj/views/layouts`
- `main.handlebars`
- `noMenu.handlebars`

### `bkp_proj/views/pedido`
- `pedidoCreate.handlebars`
- `pedidoList.handlebars`
- `pedidoUpdate.handlebars`

### `bkp_proj/views/produto`
- `produtoCreate.handlebars`
- `produtoList.handlebars`
- `produtoUpdate.handlebars`

### `bkp_proj/views/vendedor`
- `home.handlebars`
- `login.handlebars`
- `vendedorCreate.handlebars`
- `vendedorList.handlebars`
- `vendedorUpdate.handlebars`

## 🛠️ Tecnologias Utilizadas
- Node.js
- Express
- Sequelize (PostgreSQL)
- Handlebars
- CSS puro

## ⚙️ Como executar o projeto
```bash
npm install
node app.js
```

Acesse: `http://localhost:8081`

## 👨‍💻 Desenvolvido por
Davi Emanuel Salles
