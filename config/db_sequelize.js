// Importa a biblioteca Sequelize (ORM para bancos de dados relacionais)
const Sequelize = require('sequelize');

// Cria uma instância do Sequelize, conectando ao banco PostgreSQL
// Banco: 'projeto_ce', Usuário: 'postgres', Senha: '1234', Host: localhost
const sequelize = new Sequelize('projeto_ce', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'  // Define o tipo de banco (dialeto) como PostgreSQL
});

// Cria um objeto que armazenará as configurações e os modelos
var db = {};

// Adiciona o próprio Sequelize e a instância configurada ao objeto
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importa o modelo Cliente e inicializa com a instância do Sequelize
db.Cliente = require('../models/relational/cliente.js')(sequelize, Sequelize);

// Importa o modelo Vendedor
db.Vendedor = require('../models/relational/vendedor.js')(sequelize, Sequelize);

// Importa o modelo Produto
db.Produto = require('../models/relational/produto.js')(sequelize, Sequelize);

// Importa o modelo Categoria
db.Categoria = require('../models/relational/categoria.js')(sequelize, Sequelize);

// Importa o modelo Pedido (tabela intermediária de muitos-para-muitos)
db.Pedido = require('../models/relational/pedido.js')(sequelize, Sequelize);

// Define um relacionamento entre Categoria e Produto (1:N)
// Uma Categoria pode ter muitos Produtos
// 'categoriaId' será a chave estrangeira na tabela Produto
// 'NO ACTION' impede que produtos sejam deletados em cascata com a categoria
db.Categoria.hasMany(db.Produto, { foreignKey: 'categoriaId', onDelete: 'NO ACTION' });

// Define um relacionamento entre Vendedor e Produto (1:N)
// Um Vendedor pode cadastrar vários Produtos
// 'vendedorId' será a chave estrangeira na tabela Produto
db.Vendedor.hasMany(db.Produto, { foreignKey: 'vendedorId', onDelete: 'NO ACTION' });

// Define relacionamento muitos-para-muitos entre Cliente e Produto através da tabela Pedido
// Um Cliente pode comprar vários Produtos e um Produto pode ser comprado por vários Clientes
db.Cliente.belongsToMany(db.Produto, {
    through: db.Pedido,       // tabela intermediária
    foreignKey: 'clienteId',  // chave estrangeira na tabela Pedido
    otherKey: 'produtoId'     // chave complementar
});

db.Produto.belongsToMany(db.Cliente, {
    through: db.Pedido,
    foreignKey: 'produtoId',
    otherKey: 'clienteId'
});

// Relacionamento direto: um Pedido pertence a um Cliente
db.Pedido.belongsTo(db.Cliente, { foreignKey: 'clienteId' });

// Relacionamento direto: um Pedido pertence a um Produto
db.Pedido.belongsTo(db.Produto, { foreignKey: 'produtoId' });

// Um Produto pertence a uma Categoria (relação inversa de hasMany)
db.Produto.belongsTo(db.Categoria, { foreignKey: 'categoriaId' });

// Um Produto pertence a um Vendedor
db.Produto.belongsTo(db.Vendedor, { foreignKey: 'vendedorId' });

// Um Cliente pode ter vários Pedidos
db.Cliente.hasMany(db.Pedido, { foreignKey: 'clienteId' });

// Um Produto pode estar relacionado a vários Pedidos
db.Produto.hasMany(db.Pedido, { foreignKey: 'produtoId' });

// Exporta o objeto db contendo Sequelize, a instância de conexão e os modelos configurados
module.exports = db;
