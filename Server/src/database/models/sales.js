const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Sale", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM("Efectivo", "Tarjeta de crédito", "Tarjeta de débito", "Transferencia"),
      allowNull: false,
    },
    deliveryLocation: {
      type: DataTypes.STRING,
    },
    cartId: {
      type: DataTypes.UUID, // Referencia al Cart
      allowNull: false,
  },
  },
  {
    timestamps: false,
  });
};
