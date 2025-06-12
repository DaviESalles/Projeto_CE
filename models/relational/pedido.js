module.exports = (sequelize, Sequelize) => {
    const Pedido = sequelize.define('pedido', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        clienteId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        produtoId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        valorTotal: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        indexes: [] // Garante que nenhuma indexação única seja criada automaticamente
    });

    return Pedido;
};
