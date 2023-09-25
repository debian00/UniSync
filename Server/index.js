require('dotenv').config()
const server = require('./src/server');
const { sequelize } = require('./src/database/db');

const port = process.env.PORT || 3001

// sequelize.sync({ alter: true }).then(() => {
//   console.log('Database synchronized successfully.');
  server.listen(port, () => {
    console.log(`Server listening at ${port}... it's working!`)
  });
// });