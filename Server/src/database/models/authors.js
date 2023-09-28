const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Author", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(50),
      }
    },
    { timestamps: false }
  );
};
