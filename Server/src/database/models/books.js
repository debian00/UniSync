const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Book",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            author: {
                type: DataTypes.ARRAY(DataTypes.STRING),
            },
            description: {
                type: DataTypes.TEXT,
            },
            gender: {
                type: DataTypes.ARRAY(DataTypes.STRING),
            },
            publicationYear: {
                type: DataTypes.INTEGER,
            },
            images: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
            },
            sellPrice: {
                type: DataTypes.INTEGER,
            },
            averageScore: {
                type: DataTypes.FLOAT,
                defaultValue: 0.0,
            },
            numberOfReviews: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            stock: {
                type: DataTypes.INTEGER                
            },
            availability: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            }

        },
        { timestamps: false }
    );
};
