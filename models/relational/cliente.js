const bcrypt = require('bcrypt');

// Exporta uma função que define o modelo Cliente usando Sequelize
module.exports = (sequelize, Sequelize) => {
    // Define o modelo 'cliente' com seus campos e tipos
    const Cliente = sequelize.define('cliente', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tipo: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cpf: {
            type: Sequelize.STRING,
            allowNull: false
        },
        endereco: {
            type: Sequelize.STRING,
            allowNull: false
        },
        produto_preferido: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    // Hook: antes de criar, criptografa a senha
    Cliente.beforeCreate(async (cliente, options) => {
        const hash = await bcrypt.hash(cliente.senha, 10);
        cliente.senha = hash;
    });

    return Cliente;
};
