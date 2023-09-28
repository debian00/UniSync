const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Review", {
    id: {
      type: DataTypes.UUID, // Cambiado a UUID
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Cambiado a UUIDV4
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
    {
      timestamps: false,
    }
  )
}
