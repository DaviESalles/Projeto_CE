// Exporta uma função que define o modelo Produto usando Sequelize
module.exports = (sequelize, Sequelize) => {
    // Define o modelo 'produto' com seus campos e tipos
    const Produto = sequelize.define('produto', {
        // Campo 'id': inteiro, auto-incrementado, chave primária, não nulo
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        // Campo 'categoriaId': inteiro, obrigatório, chave estrangeira para categoria do produto
        categoriaId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // Campo 'vendedorId': inteiro chave estrangeira para o vendedor responsável
        vendedorId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        // Campo 'produto': string, obrigatório (nome do produto)
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // Campo 'preco': decimal, obrigatório (valor do produto)
        preco: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        // Campo 'descricao': string, obrigatório (detalhes do produto)
        descricao: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Produto;
};