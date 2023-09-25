const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING(25),
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type :DataTypes.STRING
    },
    userType: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: true,
      defaultValue: "user",
    },
  },
    {
      timestamps: false,
    }
  )
}