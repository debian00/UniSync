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
    profilePic: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true
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
    hide: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    gitHubId:{
      type:DataTypes.STRING
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
  },
    {
      timestamps: false,
    }
  )
}