const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Sale", {
    id: {
      type :DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment:{
      type:DataTypes.ENUM("Efectivo","Tarjeta de credito","Tarjeta de debito","Transferencia")
    },
    deliveryLocation:{
      type: DataTypes.STRING
    }

  },
    {
      timestamps: true,
    }
  )
}