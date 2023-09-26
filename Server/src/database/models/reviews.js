const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Review", {
    id: {
      type :DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
    },
    userName: {
      type: DataTypes.STRING,
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
    {
      timestamps: false,
    }
  )
}