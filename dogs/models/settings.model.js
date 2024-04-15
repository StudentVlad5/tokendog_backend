const sqllite = require('../../common/services/sqllite.service').sqllite;
const Sequelize = require('sequelize');
//console.log(sqllite);
/*sqllite
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  sqllite.getQueryInterface().showAllSchemas().then((tableObj) => {
    console.log('// Tables in database','==========================');
    console.log(tableObj);
})
.catch((err) => {
    console.log('showAllSchemas ERROR',err);
})*/
const settings = sqllite.define('Settings', {
  // attributes
  
    UserID:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserName: {
      type: Sequelize.STRING
    },
  Phone: {
    type: Sequelize.STRING
  },
  Email: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  UserImage: {
    type: Sequelize.BLOB
  }
},  {
  timestamps: false
});

exports.SettingModel = settings;