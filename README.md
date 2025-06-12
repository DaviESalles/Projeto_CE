# 📦 Projeto_CE - E-commerce da Agricultura Familiar

Este projeto é um sistema web completo desenvolvido com **Node.js**, **Express**, **Sequelize** e **Handlebars**, com o objetivo de gerenciar produtos, pedidos, clientes, vendedores e categorias.

## 🚀 Funcionalidades
- Cadastro e autenticação de clientes e vendedores
- Gerenciamento de produtos e categorias
- Carrinho de compras com fluxo de checkout
- Criação, listagem e atualização de pedidos
- Interface separada para vendedor e cliente

## 📁 Estrutura de Pastas e Arquivos

### `Projeto_CE`
- `.gitignore`
- `app.js`
- `atsenh.js`
- `package-lock.json`
- `package.json`

### `Projeto_CE/config`
- `db_sequelize.js`

### `Projeto_CE/controllers`
- `controllerCategoria.js`
- `controllerCliente.js`
- `controllerPedido.js`
- `controllerProduto.js`
- `controllerVendedor.js`

### `Projeto_CE/middlewares`
- `middlewares.js`

### `Projeto_CE/models/relational`
- `categoria.js`
- `cliente.js`
- `pedido.js`
- `produto.js`
- `vendedor.js`

### `Projeto_CE/routers`
- `carrinhoRoutes.js`
- `route.js`

### `Projeto_CE/views`
- `home.handlebars`

### `Projeto_CE/views/carrinho`
- `carrinho.handlebars`

### `Projeto_CE/views/categoria`
- `categoriaCreate.handlebars`
- `categoriaList.handlebars`
- `categoriaUpdate.handlebars`

### `Projeto_CE/views/checkout`
- `checkout.handlebars`
- `pagamento.handlebars`
- `sucesso.handlebars`

### `Projeto_CE/views/cliente`
- `clienteCreate.handlebars`
- `clienteList.handlebars`
- `clienteUpdate.handlebars`
- `login.handlebars`

### `Projeto_CE/views/layouts`
- `main.handlebars`
- `noMenu.handlebars`

### `Projeto_CE/views/pedido`
- `pedidoCreate.handlebars`
- `pedidoList.handlebars`
- `pedidoUpdate.handlebars`

### `Projeto_CE/views/produto`
- `produtoCreate.handlebars`
- `produtoList.handlebars`
- `produtoUpdate.handlebars`

### `Projeto_CE/views/vendedor`
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
