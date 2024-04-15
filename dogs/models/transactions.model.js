const sqllite = require('../../common/services/sqllite.service').sqllite;
const Sequelize = require('sequelize');
const transactions = sqllite.define('transactions', {
    // attributes
    
    Guid:{
        type: Sequelize.STRING,
      },
      UserID:{
        type: Sequelize.INTEGER,
      },
      Guid:{
        type: Sequelize.STRING
      },
      Amount:{
        type: Sequelize.REAL
      },
      Unity:{
        type: Sequelize.STRING
      },
      Type:{
        type: Sequelize.STRING
      }, 
      Status:{
        type: Sequelize.STRING
      }
  },  {
    timestamps: false
});


  exports.TransactionsModel =transactions;