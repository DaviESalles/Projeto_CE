// Exporta uma função que define o modelo Categoria usando Sequelize
module.exports = (sequelize, Sequelize) => {
    // Define o modelo 'categoria' com seus campos e tipos
    const Categoria = sequelize.define('categoria', {
        // Campo 'id': inteiro, auto-incrementado, chave primária, não nulo
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        // Campo 'nome': string, obrigatório (não pode ser nulo)
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // Campo 'descrição': string
        descricao: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    // Retorna o modelo definido para ser usado em outras partes da aplicação
    return Categoria;
}
