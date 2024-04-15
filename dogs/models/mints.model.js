const sqllite = require('../../common/services/sqllite.service').sqllite;
const Sequelize = require('sequelize');

const mints = sqllite.define('mints', {
    // attributes
    
    AccesoryID:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Date:{
        type: Sequelize.STRING
      }
  },  {
    timestamps: false
});

  exports.MintsModel =mints;