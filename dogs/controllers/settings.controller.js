const sequelize = require('sequelize');

const SettingModel =require('../models/settings.model').SettingModel;

exports.SettingCreate = (req,res)=>{
    SettingModel.create({
        UserID:req.body.UserID,
        Phone:req.body.Phone,
        Email:req.body.Email,
        UserImage:req.body.UserImage
    })   .then(function (result) {
      res.status(200).send(result);
  })
}

exports.deleteSetting=(req,res)=>{
    
    SettingModel.destroy({
      where:{
        ID:req.params.settingID
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


exports.updateSettings=(req,res)=>{
    SettingModel.update(
      {UserID:req.body.UserID,Phone:req.body.Phone,Email:req.body.Email,UserImage:req.body.UserImage},
      {
      where:{
        ID:req.params.settingID
      }
  
    }).then(function(result){
      res.status(200).send(result);
    })};