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
const dogs = sqllite.define('dogs', {
    // attributes
    
      DogID:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Races:{
        type: Sequelize.INTEGER
      },
      Gold:{
        type: Sequelize.INTEGER
      },
      Silver:{
        type: Sequelize.INTEGER
      },
      Bronze:{
        type: Sequelize.INTEGER
      },
      BestTime:{
        type: Sequelize.INTEGER
      },
      Image:{
        type: Sequelize.STRING
      },
      CurImage:{
        type: Sequelize.STRING
      },
      Owner_ID:{
        type: Sequelize.INTEGER
      },
      Mom_ID:{
        type: Sequelize.INTEGER
      },
      Dad_ID:{
        type: Sequelize.INTEGER
      },
      Name:{
        type: Sequelize.STRING
      },
      BIO:{
        type: Sequelize.STRING
      },
      Generation: {
      type: Sequelize.INTEGER
    },
    DNA: {
      type: Sequelize.INTEGER
      // allowNull defaults to true
    },
    EXP: {
      type: Sequelize.INTEGER
    },
    Coins: {
      type: Sequelize.INTEGER
    },
    Race_EXP: {
      type: Sequelize.INTEGER
    },
    IsSpecialCharacter: {
      type: Sequelize.INTEGER
    },
    IsNFT: {
      type: Sequelize.INTEGER
    },
    IsBadger: {
      type: Sequelize.INTEGER
    },
    IsUnicorn: {
      type: Sequelize.INTEGER
    },
    IsPotato: {
      type: Sequelize.INTEGER
    }
    ,
    BG: {
      type: Sequelize.STRING
    },
    PurchasePrice: {
      type: Sequelize.STRING
    },
    BreedingPrice: {
      type: Sequelize.STRING
    },
    Birthday: {
      type: Sequelize.STRING
    },
    TopBreedComposition_FullInfo: {
      type: Sequelize.TEXT
    },
    AgeInWords: {
      type: Sequelize.TEXT
    },
    PurityPer: {
      type: Sequelize.INTEGER
    },
    IsOnSale: {
      type: Sequelize.INTEGER
    }
  },  {
    timestamps: false
});
exports.DogsModel =dogs;
  