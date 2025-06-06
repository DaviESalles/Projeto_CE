const bcrypt = require('bcrypt');

// Exporta uma função que define o modelo vendedor usando Sequelize
module.exports = (sequelize, Sequelize) => {
    const vendedor = sequelize.define('vendedor', {
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
        cpf: {
            type: Sequelize.STRING,
            allowNull: false
        },
        endereco: {
            type: Sequelize.STRING,
            allowNull: false
        },
        especialidade: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    // Hook: antes de criar, criptografa a senha
    vendedor.beforeCreate(async (v, options) => {
        const hash = await bcrypt.hash(v.senha, 10);
        v.senha = hash;
    });

    return vendedor;
};
