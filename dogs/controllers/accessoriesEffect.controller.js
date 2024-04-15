const sequelize = require('sequelize');

const accessoryEffects = require('../models/accessories.model').AccessoryEffectsModel;



exports.accessoryEffectsCreate = (req,res)=>{
    accessoryEffects.create({
        EffectID: req.body.EffectID,
        AccessoryID:req.body.AccessoryID

    })   .then(function (result) {
      res.status(200).send(result);
  })
}


exports.deleteAccessoryEffect=(req,res)=>{
    
    accessoryEffects.destroy({
      where:{
        id:req.params.accesID
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


exports.updateAssocciationEffect=(req,res)=>{
  accessoryEffects.update(
    {EffectID:req.body.EffectID,AccessoryID: req.body.AccessoryID},
    {
    where:{
      ID:req.params.accesID
    }

  }).then(function(result){
    res.status(200).send(result);
  })};
