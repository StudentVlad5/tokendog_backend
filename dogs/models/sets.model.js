const sqllite = require('../../common/services/sqllite.service').sqllite;
const Sequelize = require('sequelize');
const AccessoriesModel = require('../models/accessories.model').AccessoriesModel;
const sets = sqllite.define('sets', {
    // attributes
    
    SetID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      Name:{
        type: Sequelize.STRING
      }
  },  {
    timestamps: false
});


  exports.SetsModel =sets;