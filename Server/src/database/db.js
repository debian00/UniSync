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
  `postgresql://postgres:Y6DajEcJ29HL7lPNcHxu@containers-us-west-121.railway.app:6035/railway`,
  { logging: false }
);

BookModel(sequelize);
UserModel(sequelize);
ReviewModel(sequelize);
SaleModel(sequelize);
AuthorModel(sequelize);
GenreModel(sequelize)

const { Book, User, Review, Sale, Author, Genre } = sequelize.models;

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
//Reviews que HACE el usuario a los libros
User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(Sale);
Sale.belongsTo(User);


module.exports = {
  sequelize,
  ...sequelize.models,
};
