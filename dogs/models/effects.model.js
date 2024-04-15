const sqllite = require('../../common/services/sqllite.service').sqllite;
const Sequelize = require('sequelize');
const AccessoriesModel = require('../models/accessories.model').AccessoriesModel;

const effects= sqllite.define('effects', {
    // attributes
    
    EffectID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      AccessoryID:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Name:{
        type: Sequelize.STRING
      }
  },  {
    timestamps: false
});

  exports.EffectsModel =effects;