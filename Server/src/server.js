require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const session = require("express-session");
const pgSession = require('connect-pg-simple')(session);
const { sequelize } = require('./database/db')
const passport = require("passport");
const router = require('./routes/index')

//Server levantado
const server = express()

server.use(morgan('dev'));
server.use(express.json())
server.use(cors({}))

//session express
server.use(
  session({
    store: new pgSession({
      // Insert connect-pg-simple options here
      pool: sequelize,
      tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
    // Insert express-session options here
  })
);

// Configura passport
server.use(passport.initialize());
server.use(passport.session());

//Enlace a los endpoints
server.use(router)

//Error por si algo falla por aca:
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json('Error interno del servidor...')
})

module.exports = server