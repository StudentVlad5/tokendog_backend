const sequelize = require('sequelize');
const Op = sequelize.Op;
const AccessoryOwnersModel = require('../models/accessories.model').AccessoryOwnersModel;




exports.accessoryOwnerCreate = (req,res)=>{
    AccessoryOwnersModel.create({
        AccessoryID:req.body.AccessoryID,
        UserID: req.body.UserID

    })   .then(function (result) {
      res.status(200).send(result);
  })
}

exports.deleteAccessoryOwners=(req,res)=>{
    
    AccessoryOwnersModel.destroy({
      where:{
        ID:req.params.accessOwnerID
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

exports.updateAssocciationOwner=(req,res)=>{
    AccessoryOwnersModel.update(
      {UserID:req.body.UserID,AccessoryID: req.body.AccessoryID},
      {
      where:{
        ID:req.params.accessOwnerID
      }
  
    }).then(function(result){
      res.status(200).send(result);
    })};