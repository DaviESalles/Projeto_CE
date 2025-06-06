// Exporta uma função que define o modelo Cliente usando Sequelize
module.exports = (sequelize, Sequelize) => {
    // Define o modelo 'cliente' com seus campos e tipos
    const Cliente = sequelize.define('cliente', {
        // Campo 'id': inteiro, auto-incrementado, chave primária, não nulo
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        // Campo 'login': string, obrigatório, usado como nome de login do cliente
        login: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // Campo 'senha': string, obrigatório, armazena a senha do cliente
        senha: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // Campo 'tipo': integer, obrigatório, armazena o tipo do cliente
        tipo: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // Campo 'cpf': string, obrigatório, armazena o CPF do cliente (com ou sem máscara)
        cpf: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // Campo 'endereco': string, obrigatório, armazena o endereço do cliente
        endereco: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // Campo 'produto_preferido': string, opcional, armazena o produto preferido do cliente
        produto_preferido: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    // Retorna o modelo definido para uso em outras partes do sistema
    return Cliente;
}









// // Exporta uma função que define o modelo Cliente usando Sequelize
// module.exports = (sequelize, Sequelize) => {
//     // Define o modelo 'cliente' com seus campos e tipos
//     const Cliente = sequelize.define('cliente', {
//         // Campo 'id': inteiro, auto-incrementado, chave primária, não nulo
//         id: {
//             type: Sequelize.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true
//         },
//         // Campo 'login': string, obrigatório, usado como nome de cliente para login
//         login: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         // Campo 'senha': string, obrigatório, armazena a senha do cliente
//         senha: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         // Campo 'tipo': inteiro, obrigatório, pode indicar o tipo ou perfil do cliente (ex: admin, comum)
//         tipo: {
//             type: Sequelize.INTEGER,
//             allowNull: false
//         }
//     });

//     // Retorna o modelo definido para uso em outras partes do sistema
//     return Cliente;
// }
