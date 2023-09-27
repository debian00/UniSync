require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const { Sequelize } = require("sequelize");

//Imports de los modelos:
const BookModel = require("./models/books")
const UserModel = require("./models/users");
const ReviewModel = require("./models/reviews");
const SaleModel = require("./models/sales")
const AuthorModel = require('./models/authors')

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/UniSyncDB`,
  { logging: false }
);

UserModel(sequelize);
ReviewModel(sequelize);
BookModel(sequelize);
SaleModel(sequelize);
AuthorModel(sequelize)

const { User, Review, Book, Sale, Author } = sequelize.models;

User.belongsToMany(Review, { through: "userReview" });
Review.belongsTo(User, { through: "userReview" });

User.belongsToMany(Sale, {through: "bookSales"})
Book.belongsToMany(Sale, {through: "bookSales"})

Author.belongsToMany(Book, {through: "authorBooks"})
Book.belongsTo(Author, {through: "authorBooks"})




module.exports = {
  sequelize,
  ...sequelize.models,
};
