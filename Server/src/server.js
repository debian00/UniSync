require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const session = require("express-session");
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg')
const passport = require("passport");
const router = require('./routes/index')

//Server levantado
const server = express()

server.use(morgan('dev'));
server.use(express.json())
server.use(cors({}))

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'UniSyncDB',
  password: process.env.DB_PASSWORD,
  port: 5432
});

//session express
server.use(
  session({
    store: new pgSession({
      pool,
      tableName: 'session',
      createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 días
    // Inserta otras opciones de express-session según sea necesario
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