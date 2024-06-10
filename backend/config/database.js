const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ris_projekat', 'root', 'root', {
    host: '127.0.0.1',
    port: 3307,
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));


module.exports = sequelize;
