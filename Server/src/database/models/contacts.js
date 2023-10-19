const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Contact', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        
     },
     lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        
     },
     phone: {
        type: DataTypes.STRING,
        allowNull: false,
        
     },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         isEmail:true
      },
      message:{
         type: DataTypes.STRING,
         allowNull: false
      }
   }, 
   { timestamps: false });
};
