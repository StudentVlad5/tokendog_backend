const Sequelize = require('sequelize');
const config = require('../../common/config/env.config');
const sequelize = new Sequelize("dogs_dev", "dogs_dev", 
"74xpJcmZC93BN94t", {
host: "localhost",
  port: "",  // <----------------The port number you copied
  dialect: "mssql",
  operatorsAliases: false,
  pool: {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
}
});