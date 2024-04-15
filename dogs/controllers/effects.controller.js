const sequelize = require('sequelize');

const EffectsModel = require('../models/accessories.model').EffectsModel;


exports.effectsCreate = (req,res)=>{
    EffectsModel.create({
        EffectID:req.body.EffectID,
        Name:req.body.Name
    })   .then(function (result) {
      res.status(200).send(result);
  })
}

exports.deleteEffect=(req,res)=>{
    
    EffectsModel.destroy({
      where:{
        EffectID:req.params.effectID
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

exports.updateEffects=(req,res)=>{
  EffectsModel.update(
    {EffectID:req.body.EffectID,Name: req.body.Name},
    {
    where:{
      ID:req.params.effectID
    }

  }).then(function(result){
    res.status(200).send(result);
  })};