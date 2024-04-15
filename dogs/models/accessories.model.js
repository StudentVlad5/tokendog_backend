const sqllite = require('../../common/services/sqllite.service').sqllite;
const Sequelize = require('sequelize');
const SetsModel = require('../models/sets.model').SetsModel;
const MintsModel= require('../models/mints.model').MintsModel;


const accessories = sqllite.define('accessories', {
    // attributes
    
    AccessoryID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      Name:{
        type: Sequelize.STRING
      },
      Description:{
        type: Sequelize.STRING
      },
      Type:{
        type: Sequelize.STRING
      },
      Image:{
        type: Sequelize.STRING
      },
       SetID:{
            type:Sequelize.INTEGER
          },

      MaxCount:{
        type: Sequelize.INTEGER
      }
  },  {
    timestamps: false
});
//----- efect acessory ----/
const effects= sqllite.define('effects', {
  // attributes
  EffectID:{
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

const accessoryEffects = sqllite.define('accessoriesEffects', {
  // attributes
    ID:{
      type:Sequelize.INTEGER
    },
  EffectID:{
      type: Sequelize.INTEGER,
      references: {
        model: accessories,
        key: "EffectID"
    }
    },
    AccessoryID:{
      type: Sequelize.INTEGER,
      references: {
        model: effects,
        key: "AccessoryID"
    }
    }
},  {
  timestamps: false
});

//----Dogs acessory ----//
const dogs = sqllite.define('dogs', {
  // attributes
  
    DogID:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
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
  TopBreedComposition_FullInfo: {
    type: Sequelize.TEXT
  },
  AgeInWords: {
    type: Sequelize.TEXT
  },
  PurityPer: {
    type: Sequelize.INTEGER
  }
},  {
  timestamps: false
});

const accessoryDogs= sqllite.define('accessoryDogs', {
  // attributes
  
  DogID:{
      type: Sequelize.INTEGER,
    references:{
      model:accessories,
      key:"DogID"
    }
    },
    AccessoryID:{
      type: Sequelize.INTEGER,
      references:{
        model: dogs,
        key:"AccessoryID"
      }
    }
},  {
  timestamps: false
});


//----Setings Model conecction Models ----//
accessories.belongsTo(SetsModel,{foreignKey:'SetID'});
accessories.hasMany(MintsModel,{foreignKey:'AccesoryID'})

//---Efect ManyToMany --- /
accessories.belongsToMany(effects,{
  through: accessoryEffects,
  //as:"AccessoryEffects",
  foreignKey: 'AccessoryID',
  timestamps: false
});
effects.belongsToMany(accessories,{
  through: accessoryEffects,
  foreignKey: 'EffectID',
  timestamps: false
  });
//---DogsManyToMany---//

accessories.belongsToMany(dogs,{
  through: accessoryDogs,
  foreignKey: 'AccessoryID',
  timestamps: false
});

dogs.belongsToMany(accessories,{
  through:accessoryDogs,
  foreignKey: 'DogID',
  timestamps: false
})

//------Owner conecting -----///

const settings = sqllite.define('settings', {
  // attributes
  
    UserID:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
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

const accessoryOwners = sqllite.define('accessoryOwners', {
  // attributes
  
  AccessoryID:{
      type: Sequelize.INTEGER,
      references:{
        model:accessories,
        key:"AccessoryID"
      }
    },
    UserID:{
      type: Sequelize.INTEGER,
      references:{
        model:settings,//
        key:"UserID"
      }
    }
},  {
  timestamps: false
});

accessories.belongsToMany(settings,{
  through: accessoryOwners,
  foreignKey: 'AccessoryID',
  timestamps: false
});

settings.belongsToMany(accessories,{
  through:accessoryOwners,
  foreignKey: 'UserID',
  timestamps: false
})



//-----Export Modles -----//
exports.AccessoryOwnersModel =accessoryOwners;
exports.SettingModel = settings;
exports.AccessoryDogsModel =accessoryDogs;
exports.DogsModel =dogs;
exports.AccessoryEffectsModel =accessoryEffects;
exports.AccessoriesModel =accessories;
exports.EffectsModel =effects;