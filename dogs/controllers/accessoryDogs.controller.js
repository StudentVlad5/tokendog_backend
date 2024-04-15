const sequelize = require('sequelize');


const AccessoryDogsModel = require('../models/accessories.model').AccessoryDogsModel;

exports.accessoryDogsCreate = (req,res)=>{
    AccessoryDogsModel.create({
        DogID: req.body.DogID,
        AccessoryID:req.body.AccessoryID

    })   .then(function (result) {
      res.status(200).send(result);
  })
}

exports.deleteAccessoryDogs=(req,res)=>{
    
    AccessoryDogsModel.destroy({
      where:{
        ID:req.params.accessDogID
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


exports.updateAssocciationDogs=(req,res)=>{
    AccessoryDogsModel.update(
      {DogID:req.body.DogID,AccessoryID: req.body.AccessoryID},
      {
      where:{
        ID:req.params.accessDogID
      }
  
    }).then(function(result){
      res.status(200).send(result);
    })};
  