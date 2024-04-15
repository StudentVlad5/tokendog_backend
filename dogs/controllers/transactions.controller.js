const sequelize = require('sequelize');

const TransactionsModel = require('../models/transactions.model').TransactionsModel;


exports.TransactionsGet = (req,res)=>{
  TransactionsModel.findAll({
    where: {
      UserID: req.params.userID
    }
  }).then(transactions => {
    
    
    //console.log(dog);
    res.status(200).send(transactions);
    
    
  });
}
exports.TransactionsGetByGuid = (req,res)=>{
  TransactionsModel.findOne({
    where: {
      Guid: req.params.Guid
    }
  }).then(transaction => {
    
    
    //console.log(dog);
    res.status(200).send(transaction);
    
    
  });
}
exports.TransactionsCreate = (req,res)=>{
  TransactionsModel.create({
    
    UserID:req.body.UserID,
    Guid:req.body.Guid,
    Amount:req.body.Amount,
    Unity:req.body.Unity,
    Type:req.body.Type,
    Status:req.body.Status
})   .then(function (result) {
  res.status(200).send(result);
})
}

exports.TransactionsDelete=(req,res)=>{
    
  TransactionsModel.destroy({
      where:{
        Guid:req.params.guid
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


exports.TransactionsUpdate=(req,res)=>{
  TransactionsModel.update(
      {
        UserID:req.body.UserID,
        Guid:req.params.Guid,
        Amount:req.body.Amount,
        Unity:req.body.Unity,
        Type:req.body.Type,
        Status:req.body.Status
      },
      {
      where:{
        Guid:req.params.Guid
      }
  
    }).then(function(result){
      res.status(200).send(result);
    })};