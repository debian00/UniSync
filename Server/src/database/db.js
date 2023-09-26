require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const { Sequelize } = require("sequelize");

//Imports de los modelos:
const BookModel = require("./models/books")
const UserModel = require("./models/users");
const ReviewModel = require("./models/reviews");
const SaleModel = requier("./models/sales")

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/UniSyncDB`,
  { logging: false }
);

UserModel(sequelize);
ReviewModel(sequelize);
BookModel(sequelize);
SaleModel(sequelize);

const { User, Review } = sequelize.models;

User.belongsToMany(Review, { through: "userReview" });
Review.belongsTo(User, { through: "userReview" });

User.hasMany(Sale, {through: "bookSales"})
Book.belongsToMany(Sale, {through: "bookSales"})


module.exports = {
  sequelize,
  ...sequelize.models,
};
