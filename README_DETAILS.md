# 📄 Projeto_CE - Detalhamento de Arquivos

Este documento detalha o propósito de **cada arquivo** presente na estrutura do projeto `Projeto_CE`.

## 📁 Projeto_CE
- **.gitignore**: Arquivo auxiliar do sistema.
- **app.js**: Arquivo principal da aplicação, responsável por inicializar o servidor e configurar rotas e middlewares.
- **atsenh.js**: Script auxiliar (possivelmente para resetar senhas ou autenticação).
- **package-lock.json**: Arquivo auxiliar do sistema.
- **package.json**: Define as dependências, scripts e metadados do projeto Node.js.

## 📁 Projeto_CE/config
- **db_sequelize.js**: Configuração da conexão Sequelize com o banco de dados PostgreSQL.

## 📁 Projeto_CE/controllers
- **controllerCategoria.js**: Controlador responsável por tratar as requisições da entidade Categoria.
- **controllerCliente.js**: Controlador responsável por tratar as requisições da entidade Cliente.
- **controllerPedido.js**: Controlador responsável por tratar as requisições da entidade Pedido.
- **controllerProduto.js**: Controlador responsável por tratar as requisições da entidade Produto.
- **controllerVendedor.js**: Controlador responsável por tratar as requisições da entidade Vendedor.

## 📁 Projeto_CE/middlewares
- **middlewares.js**: Define middlewares que interceptam requisições para aplicar lógica como autenticação ou logs.

## 📁 Projeto_CE/models/relational
- **categoria.js**: Script JavaScript com lógica específica do backend.
- **cliente.js**: Script JavaScript com lógica específica do backend.
- **pedido.js**: Script JavaScript com lógica específica do backend.
- **produto.js**: Script JavaScript com lógica específica do backend.
- **vendedor.js**: Script JavaScript com lógica específica do backend.

## 📁 Projeto_CE/routers
- **carrinhoRoutes.js**: Define as rotas da aplicação, conectando URLs aos controladores.
- **route.js**: Define as rotas da aplicação, conectando URLs aos controladores.

## 📁 Projeto_CE/views
- **home.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.

## 📁 Projeto_CE/views/carrinho
- **carrinho.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.

## 📁 Projeto_CE/views/categoria
- **categoriaCreate.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **categoriaList.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **categoriaUpdate.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.

## 📁 Projeto_CE/views/checkout
- **checkout.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **pagamento.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **sucesso.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.

## 📁 Projeto_CE/views/cliente
- **clienteCreate.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **clienteList.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **clienteUpdate.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **login.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.

## 📁 Projeto_CE/views/layouts
- **main.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **noMenu.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.

## 📁 Projeto_CE/views/pedido
- **pedidoCreate.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **pedidoList.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **pedidoUpdate.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.

## 📁 Projeto_CE/views/produto
- **produtoCreate.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **produtoList.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **produtoUpdate.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.

## 📁 Projeto_CE/views/vendedor
- **home.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **login.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **vendedorCreate.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **vendedorList.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
- **vendedorUpdate.handlebars**: Template de página web usado para renderizar o HTML dinâmico com dados do backend.
