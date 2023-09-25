require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const { Sequelize } = require("sequelize");

//Imports de los modelos:
const UserModel = require("./models/users");
const ReviewModel = require("./models/reviews");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/UniSyncDB`,
  { logging: false }
);

UserModel(sequelize);
ReviewModel(sequelize);

const { User, Review } = sequelize.models;

User.belongsToMany(Review, { through: "userReview" });
Review.belongsTo(User, { through: "userReview" });

module.exports = {
  sequelize,
  ...sequelize.models,
};
