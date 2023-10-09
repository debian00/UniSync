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
            bookId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
        },
        { timestamps: true,
            hooks: {
                beforeCreate: async (cartItem) => {
                  const book = await sequelize.models.Book.findByPk(cartItem.bookId);
                  if (book) {
                    cartItem.price = book.sellPrice;
                  }
                },
                beforeUpdate: async (cartItem) => {
                  const book = await sequelize.models.Book.findByPk(cartItem.bookId);
                  if (book) {
                    cartItem.price = book.sellPrice * cartItem.quantity;
                  }
                },
              }, }
    );
};
