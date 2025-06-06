// Exporta uma função que define o modelo vendedor usando Sequelize
module.exports = (sequelize, Sequelize) => {
    // Define o modelo 'vendedor' com seus campos e tipos
    const vendedor = sequelize.define('vendedor', {
        // Campo 'id': inteiro, auto-incrementado, chave primária, não nulo
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        // Campo 'login': string, obrigatório, usado como nome de login do vendedor
        login: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // Campo 'senha': string, obrigatório, armazena a senha do vendedor
        senha: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // Campo 'cpf': string, obrigatório, armazena o CPF do vendedor (com ou sem máscara)
        cpf: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // Campo 'endereco': string, obrigatório, armazena o endereço do vendedor
        endereco: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // Campo 'especialidade': string, obrigatório, indica a especialidade culinária do vendedor
        especialidade: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    // Retorna o modelo definido para uso em outras partes do sistema
    return vendedor;
};
