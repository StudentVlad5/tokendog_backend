const sequelize = require('sequelize');

const SetsModel = require('../models/sets.model').SetsModel;



exports.SetsCreate = (req,res)=>{
    SetsModel.create({
        SetID:req.body.SetID,
        Name:req.body.Name
    })   .then(function (result) {
      res.status(200).send(result);
  })
}

exports.deleteSets=(req,res)=>{
    
    SetsModel.destroy({
      where:{
        ID:req.params.setsID
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


exports.updateSets=(req,res)=>{
    SetsModel.update(
      {SetID:req.body.SetID,Name: req.body.Name},
      {
      where:{
        ID:req.params.setsID
      }
  
    }).then(function(result){
      res.status(200).send(result);
    })};