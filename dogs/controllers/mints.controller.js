const sequelize = require('sequelize');

const MintsModel = require('../models/mints.model').MintsModel;




exports.MintsCreate = (req,res)=>{
    MintsModel.create({
        AccesoryID:req.body.AccesoryID,
        Date:req.body.Date
    })   .then(function (result) {
      res.status(200).send(result);
  })
}

exports.deleteMints=(req,res)=>{
    
  MintsModel.destroy({
      where:{
        ID:req.params.mintID
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

exports.updateMints=(req,res)=>{
  MintsModel.update(
    {AccessoryID:req.body.AccessoryID,Date: req.body.Date},
    {
    where:{
      ID:req.params.mintID
    }

  }).then(function(result){
    res.status(200).send(result);
  })};