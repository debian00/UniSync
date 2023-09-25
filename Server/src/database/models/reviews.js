const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Review", {
    id: {
      type :DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    }
  },
    {
      timestamps: false,
    }
  )
}