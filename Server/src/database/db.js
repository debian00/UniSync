require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const { Sequelize } = require("sequelize");

//Imports de los modelos:
const BookModel = require("./models/books")
const UserModel = require("./models/users");
const ReviewModel = require("./models/reviews");
const SaleModel = require("./models/sales")
const AuthorModel = require('./models/authors')
const GenreModel = require('./models/genres')
const CartModel = require('./models/carts')

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false }
);

BookModel(sequelize);
UserModel(sequelize);
ReviewModel(sequelize);
SaleModel(sequelize);
AuthorModel(sequelize);
GenreModel(sequelize)
CartModel(sequelize)

const { Book, User, Review, Sale, Author, Genre, Cart } = sequelize.models;

//Relaciones de Book
Book.hasMany(Review);
Review.belongsTo(Book);

Book.belongsTo(Author);
Author.hasMany(Book);

Book.belongsToMany(Sale, { through: 'bookSale' });
Sale.belongsToMany(Book, { through: 'bookSale' });

Book.belongsToMany(Genre, { through: 'bookGenre' });
Genre.belongsToMany(Book, { through: 'bookGenre' });

Cart.belongsToMany(Book, { through: "bookCart" });
Book.belongsToMany(Cart, { through: "bookCart" });

//Relaciones de User
//Reviews que HACE el usuario a los libros
User.hasMany(Review);
Review.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

//Relaciones 
User.hasMany(Sale);
Sale.belongsTo(User);


module.exports = {
  sequelize,
  ...sequelize.models,
};
