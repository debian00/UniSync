require('dotenv').config()
const server = require('./src/server');
const { sequelize } = require('./src/database/db');

// Agregar la sincronización aquí
sequelize.sync({ force: false }) 
  .then(() => {
    const port = process.env.PORT || 3001;
    server.listen(port, () => {
      console.log(`Server listening at ${port}... it's working!`)
    });
  })
  .catch((error) => {
    console.error('Error syncing Sequelize models:', error);
  });
