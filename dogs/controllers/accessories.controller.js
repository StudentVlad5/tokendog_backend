const axios = require('axios');
const sequelize = require('sequelize');
const AccessoriesModel = require('../models/accessories.model').AccessoriesModel;
const AccessoryDogsModel = require('../models/accessories.model').AccessoryDogsModel;
const AccessoryOwnersModel = require('../models/accessoryOwners.model').AccessoryOwnersModel;

const EffectsModel = require('../models/accessories.model').EffectsModel;
const MintsModel = require('../models/mints.model').MintsModel;
const SetsModel = require('../models/sets.model').SetsModel;
const DogsModel = require('../models/accessories.model').DogsModel;
const SettingModel = require('../models/accessories.model').SettingModel;

const Op = sequelize.Op;
DogsModel!=AccessoryDogsModel;
exports.list = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
      if (req.query.page) {
          req.query.page = parseInt(req.query.page);
          page = Number.isInteger(req.query.page) ? req.query.page : 0;
      }
  }
  AccessoriesModel.findAll({
    include:[
      {model:MintsModel},
     {model:SettingModel,through:{attributes:[]}, attributes: ["UserID","Phone", "Email"] },
      {model:DogsModel,through:{attributes:[]}},
      {
        model: EffectsModel,
        through: { attributes: [] }
      },
      {model:SetsModel}
    ]
  }).then(Accessories => {
    res.status(200).send(Accessories);
  });
  
};

exports.getById = (req, res) => {
  console.log(req.body);
  AccessoriesModel.findOne({
    where: {
      AccessoryID: req.params.accessoryID
     },

     include:[
      {model:MintsModel},
     {model:SettingModel,through:{attributes:[]}, attributes: ["UserID","Phone", "Email"] },
      {model:DogsModel,through:{attributes:[]}},
      {
        model: EffectsModel,
        through: { attributes: [] }
      },
      {model:SetsModel}
    ]
  }).then(accessory => {
    res.status(200).send(accessory);
    
    
  });
};

exports.getEffectsById = (req, res) => {
  console.log(req.body);
  EffectsModel.findOne({
    where: {
      accessoryID: req.params.accessoryID
    }
    

  }).then(accessory => {
    res.status(200).send(accessory);
  });
};


exports.getMintsById = (req, res) => {
  console.log(req.body);
  MintsModel.findOne({
    where: {
      accessoryID: req.params.accessoryID
    }
  }).then(accessory => {
    res.status(200).send(accessory);
    
    
  });
};
exports.sets = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
      if (req.query.page) {
          req.query.page = parseInt(req.query.page);
          page = Number.isInteger(req.query.page) ? req.query.page : 0;
      }
  }
  SetsModel.findAll().then(sets => {
    res.status(200).send(sets);
  });
  

};
  exports.getSetById = (req, res) => {
    console.log(req.body);
    SetsModel.findOne({
      where: {
        setID: req.params.setID
      }
    }).then(set => {
      res.status(200).send(set);
      
      
    });
  };
  exports.getBySetId = (req, res) => {
    console.log(req.body);
    AccessoriesModel.findOne({
      where: {
        setID: req.params.setID
      }
    }).then(set => {
      res.status(200).send(set);
    });
  };







  
 
  exports.createAssocciation=(req,res)=>{
    console.log(req.body);
    AccessoriesModel.create({
      AccessoryID: req.body.AccessoryID,
      Name:req.body.Name,
      Description:req.body.Description,
      Type:req.body.Type,
      Image:req.body.Image,
      SetID:req.body.SetID,
      MaxCount:req.body.MaxCount
    })
    .then(function (result) {
      res.status(200).send(result);
  })
  }

  exports.deleteAssocciation=(req,res)=>{
     console.log(req.params.accessoryID);
     AccessoriesModel.destroy({
       where:{
         AccessoryID:req.params.accessoryID
       }
     }).then(function (deletedRecord) {
      if(deletedRecord === 1){
          res.status(200).json({message:"Deleted successfully"});          
      }
      else
      {
          res.status(404).json({message:"record not found"})
      }
  })
  .catch(function (error){
      res.status(500).json(error);
  })
};


exports.updateAssocciation=(req,res)=>{
  AccessoriesModel.update(
    {AccessoryID: req.body.AccessoryID,Name:req.body.Name,Description:req.body.Description,Type:req.body.Type,Image:req.body.Image,SetID:req.body.SetID,MaxCount:req.body.MaxCount},
    {
    where:{
      ID:req.params.accesID
    }

  }).then(function(result){
    res.status(200).send(result);
  });

  
}

