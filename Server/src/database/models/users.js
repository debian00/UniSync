const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    fullName: {
      type: DataTypes.STRING(25),
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePic: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    birthDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING, // Cambiado: NUMBER a STRING si incluye caracteres no numéricos
      allowNull: true,
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