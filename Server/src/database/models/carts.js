const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Cart",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            userId: {
                type: DataTypes.UUID, // Referencia al usuario que posee el carrito
                allowNull: false,
            },
            items: {
                type: DataTypes.ARRAY(DataTypes.JSONB), // Un array de objetos JSON que almacena los libros en el carrito
                defaultValue: [],
            },
            completedOrders: {
                type: DataTypes.ARRAY(DataTypes.UUID), // Un array de IDs de pedidos completados
                defaultValue: [],
            },
        },
        { timestamps: true }
    );
};
