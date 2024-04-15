
const sequelize = require('sequelize');
const config = require('../../common/config/env.config');
//console.log(config.database);
const sqllite = new sequelize({
    dialect: config.database.dialect,
    storage: config.database.storage,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    
  });
  exports.sqllite = sqllite;
  //console.log(sqllite);