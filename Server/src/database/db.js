require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const { Sequelize } = require("sequelize");

//Imports de los modelos:
const BookModel = require("./models/books")
const UserModel = require("./models/users");
const ReviewModel = require("./models/reviews");
const SaleModel = require("./models/sales")
const AuthorModel = require('./models/authors')
const GenreModel = require('./models/genres')

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/UniSyncDB`,
  { logging: false }
);

UserModel(sequelize);
ReviewModel(sequelize);
BookModel(sequelize);
SaleModel(sequelize);
AuthorModel(sequelize);
GenreModel(sequelize)

const { User, Review, Book, Sale, Author, Genre } = sequelize.models;

//Relaciones de Book
Book.hasMany(Review);
Review.belongsTo(Book);

Book.belongsTo(Author);
Author.hasMany(Book);

Book.belongsToMany(Sale, { through: 'bookSale' });
Sale.belongsToMany(Book, { through: 'bookSale' });

Book.belongsToMany(Genre, { through: 'bookGenre' });
Genre.belongsToMany(Book, { through: 'bookGenre' });

//Relaciones de User
User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(Sale);
Sale.belongsTo(User);


module.exports = {
  sequelize,
  ...sequelize.models,
};
