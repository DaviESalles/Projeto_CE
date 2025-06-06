// Importa a biblioteca Sequelize (ORM para bancos de dados relacionais)
const Sequelize = require('sequelize');

// Cria uma instância do Sequelize, conectando ao banco PostgreSQL
// Banco: 'projeto_1', Cliente: 'postgres', Senha: '1234', Host: localhost
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


db.Pedido = require('../models/relational/pedido.js')(sequelize, Sequelize);



// Define um relacionamento entre Categoria e Produto (1:N)
// Uma Categoria pode ter muitos Produtos
// categoriaId será a chave estrangeira nas receitas
// 'NO ACTION' impede a exclusão em cascata
db.Categoria.hasMany(db.Produto, { foreignKey: 'categoriaId', onDelete: 'NO ACTION' });

// Define um relacionamento entre Vendedor e Produto (1:N)
// Um Vendedor pode ter muitos Produtos
// vendedorId será a chave estrangeira nas receitas
// 'NO ACTION' impede a exclusão em cascata
db.Vendedor.hasMany(db.Produto, { foreignKey: 'vendedorId', onDelete: 'NO ACTION' });


// Cliente <-> Produto via Pedido
db.Cliente.belongsToMany(db.Produto, {
    through: db.Pedido,
    foreignKey: 'clienteId',
    otherKey: 'produtoId'
});

db.Produto.belongsToMany(db.Cliente, {
    through: db.Pedido,
    foreignKey: 'produtoId',
    otherKey: 'clienteId'
});

// Relacionamentos explícitos
db.Pedido.belongsTo(db.Cliente, { foreignKey: 'clienteId' });
db.Pedido.belongsTo(db.Produto, { foreignKey: 'produtoId' });

db.Cliente.hasMany(db.Pedido, { foreignKey: 'clienteId' });
db.Produto.hasMany(db.Pedido, { foreignKey: 'produtoId' });



// Exporta o objeto db contendo Sequelize, a instância de conexão e os modelos
module.exports = db;