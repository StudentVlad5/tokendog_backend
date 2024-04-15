const axios = require('axios');
const sequelize = require('sequelize');
const SettingsModel = require('../models/settings.model').SettingModel;
const DogsModel = require('../models/dogs.model').DogsModel;
const fs = require('fs');
const path = require('path');
const request = require('request');
//const fetch = require('node-fetch');
//const crypto = require('crypto');
const dogUrl= "https://coindogs.com/webservice.asmx/GetAllDogsForNFT";
const dogAuthorizeUrl= "https://coindogs.com/webservice.asmx/Authorize";
const UnityUrl= "https://coindogs.com/WebService.asmx/UnityGet";
const coinDogsUrl= "https://coindogs.com/";
const cryptoDogsUrl= "http://nftdog.coindogs.com:8000";
const cryptoDogsRelatieUrl ="/public/uploadImages/";
const coinDogsRelatieUrl= "dog-images/";

const Op = sequelize.Op;
/*exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    DogModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};*/
function httpGet(url) {
    return new Promise((resolve, reject) => {
      const http = require('http'),
        https = require('https');
  
      let client = http;
  
      if (url.toString().indexOf("https") === 0) {
        client = https;
      }
  
      client.get(url, (resp) => {
        let chunks = [];
  
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          chunks.push(chunk);
        });
  
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
  
      }).on("error", (err) => {
        reject(err);
      });
    });
  }
function httpPost(url, params) {
    return new Promise((resolve, reject) => {
      const http = require('http'),
        https = require('https');
  
      let client = http;
  
      if (url.toString().indexOf("https") === 0) {
        client = https;
      }
      
      client.post(url, params, (resp) => {
        let chunks = [];
  
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          chunks.push(chunk);
        });
  
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
  
      }).on("error", (err) => {
        reject(err);
      });
    });
  }

exports.authorize = (req, res) => {
    
    //console.log(res);
    let params = {"email":req.body.email, "password":req.body.password};
    console.log(params);
    axios.post(dogAuthorizeUrl, params)
        .then(response => {
           console.log(response.data);
           if(response.data.d=null){
             var data_d = {
               userID:0
             }
            res.status(200).send(data_d);
           }
           else{
            var response_data_str=response.data;
            var indexEnd=response_data_str.indexOf("}");
            var response_data_sub_str=response_data_str.substr(0, indexEnd+1)
            console.log(response_data_sub_str);
            res.status(200).send(JSON.parse(response_data_sub_str));
          }
        }).catch(function (error) {
          res.status(200).send(error);
        });;
    /*(async(url, export_params, export_res) => {
        var buf = await httpPost(url, export_params);
        var exp_result = JSON.parse(buf.toString('utf-8'));
        export_res.status(200).send(exp_result);

      })(dogAuthorizeUrl, params, res);*/
    
};
function download(uri, filename, callback){
  request.head(uri, function(err, res, body){
    //console.log('content-type:', res.headers['content-type']);
    //console.log('content-length:', res.headers['content-length']);
    let baseDir = path.join(__dirname, '../../public/uploadImages/');
    if (fs.existsSync(baseDir+filename)) {
      console.log("Exists");
      callback();
    }
    else{
      request(uri).pipe(fs.createWriteStream(baseDir+filename)).on('close', callback);
    }
    
  });
};
function filename(_url){
  let filename = _url.substring(_url.lastIndexOf('/')+1);
  return filename;
}
function uploadFiles(_array, _cur_array){
  if(_array.length>0){
    let _arrayItem = _array[(_array.length-1)];
    _array.splice((_array.length-1), 1);
    let _cur_arrayItem =  _cur_array[( _cur_array.length-1)];
    _cur_array.splice(( _cur_array.length-1), 1);
    /*console.log(coinDogsUrl+_arrayItem);
    console.log( _arrayItem);*/
    download((coinDogsUrl+coinDogsRelatieUrl+_arrayItem), _arrayItem, function()
    {
      download((coinDogsUrl+coinDogsRelatieUrl+_cur_arrayItem), _cur_arrayItem, function()
    {
      console.log( _arrayItem+' done');
      console.log( _cur_arrayItem+' done');
      uploadFiles(_array, _cur_array);
    });
    });
  }
} 
function asyncUpdateDogList(dogList, fileList,currentImagesItems){
  console.log(dogList.length)
  if(dogList.length>0){
    let dogListIndex=dogList.length-1;
    let dogListItem =dogList[dogListIndex];
    dogList.splice(dogListIndex, 1);
    let error;
    
    try {
      axios.get(UnityUrl+"?dog_id="+dogListItem.ID.toString())
          .then(response => {
            
            let img_str =coinDogsUrl+response.data.img;
            let cur_img_str =coinDogsUrl+response.data.current_img;
            let bio=response.data.bio;
            let birthday=response.data.birthday;
            let _filename= filename(img_str);
            let _cur_img_str_filename= filename(cur_img_str);
            fileList.push(_filename);
            currentImagesItems.push(_cur_img_str_filename);
            console.log(dogListIndex);
           
            
             // download(img_str, _filename, function(){
            //console.log('done');
            //});
            let new_img_url =cryptoDogsUrl+cryptoDogsRelatieUrl+_filename;
            let cur_new_img_url =cryptoDogsUrl+cryptoDogsRelatieUrl+_cur_img_str_filename;
              DogsModel.findOne({
                where: {
                  DogID: dogListItem.ID
                }
              }).then(dog => {
                
                //console.log(dog);
                if(!dog){
                  DogsModel.create(

                    {
                      Races:dogListItem.Races,
                      Gold:dogListItem.Gold,
                      Silver:dogListItem.Silver,
                      Bronze:dogListItem.Bronze,
                      BestTime:dogListItem.BestTime,
                      Image: new_img_url,
                      CurImage:cur_new_img_url,
                      IsDirty:dogListItem.IsDirty?1:0,
                      Owner_ID:dogListItem.Owner_ID,
                      Mom_ID:dogListItem.Mom_ID,
                      Dad_ID:dogListItem.Dad_ID,
                      Name:dogListItem.Name,
                      BIO:bio,
                      Birthday:birthday,
                      Generation:dogListItem.Generation,
                      DNA:dogListItem.DNA,
                      EXP:dogListItem.EXP,
                      Coins:dogListItem.Coins,
                      Race_EXP:dogListItem.Race_EXP,
                      IsSpecialCharacter:dogListItem.IsSpecialCharacter?1:0,
                      IsBadger:dogListItem.IsBadger?1:0,
                      IsUnicorn:dogListItem.IsUnicorn?1:0,
                      IsPotato:dogListItem.IsPotato?1:0,
                      BG:dogListItem.BG,
                      PurchasePrice:dogListItem.PurchasePrice,
                      BreedingPrice:dogListItem.BreedingPrice,
                      TopBreedComposition_FullInfo:dogListItem.TopBreedComposition_FullInfo,
                      AgeInWords:dogListItem.AgeInWords,
                      PurityPer:dogListItem.PurityPer,
                      DogID:dogListItem.ID
                    }
                  ).then(function (result) {
                    
                
                })
                }
                else{
                  DogsModel.update(
                    {
                      Races:dogListItem.Races,
                      Gold:dogListItem.Gold,
                      Silver:dogListItem.Silver,
                      Bronze:dogListItem.Bronze,
                      BestTime:dogListItem.BestTime,
                      Image: new_img_url,
                      CurImage: (dog.IsOnSale!=1)? cur_new_img_url:dog.CurImage,
                      IsDirty:dogListItem.IsDirty?1:0,
                      Owner_ID:dogListItem.Owner_ID,
                      Mom_ID:dogListItem.Mom_ID,
                      Dad_ID:dogListItem.Dad_ID,
                      Name:dogListItem.Name,
                      BIO:bio,
                      Birthday:birthday,
                      Generation:dogListItem.Generation,
                      DNA:dogListItem.DNA,
                      EXP:dogListItem.EXP,
                      Coins:dogListItem.Coins,
                      Race_EXP:dogListItem.Race_EXP,
                      IsSpecialCharacter:dogListItem.IsSpecialCharacter?1:0,
                      IsBadger:dogListItem.IsBadger?1:0,
                      IsUnicorn:dogListItem.IsUnicorn?1:0,
                      IsPotato:dogListItem.IsPotato?1:0,
                      BG:dogListItem.BG,
                      PurchasePrice:dogListItem.PurchasePrice,
                      BreedingPrice:dogListItem.BreedingPrice,
                      TopBreedComposition_FullInfo:dogListItem.TopBreedComposition_FullInfo,
                      AgeInWords:dogListItem.AgeInWords,
                      PurityPer:dogListItem.PurityPer,
                    },
                    {
                    where:{
                      DogID:dogListItem.ID
                    }
                
                  }).then(function(result){
                    //res.status(200).send(result);
                  });
                }
                
              });
              
              asyncUpdateDogList(dogList, fileList,currentImagesItems);
          }).catch(err => {
            asyncUpdateDogList(dogList,fileList,currentImagesItems);
            //asyncUpdateDogList(dogList, fileList);
            /*if (err.response.status === 404) {
              throw new Error(`${err.config.url} not found`);
            }*/
            throw err;
          });
      
        } catch (err) {
          error = err;
        }
    }
    else{
      uploadFiles(fileList, currentImagesItems);
    
    }
}
/*async function download(_url) {
  const response = await fetch(_url);
  const buffer = await response.buffer();
  fs.writeFile(`./image.jpg`, buffer, () => 
    console.log('finished downloading!'));
}*/

exports.uploadFile = (req, res) => {
  var img_str =coinDogsUrl+"/dog-images/dog-1323_plain.svg";
  //download(img_str);              
 // console.log(path.dirname(__filename));
  //console.log(__filename);
  let _filename= filename(img_str)
  download(img_str, _filename, function(){
console.log(_filename+ 'done');
});
res.status(200).send("exp_result");
};
exports.updateList = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let filesItems =[];
    let currentImagesItems =[];
    let dogListItems =[];
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    (async(url, export_res) => {
      /*for(let i=0;i<export_res.length;i++){
        dogListItems.push(export_res[i]);
      }*/
        var buf = await httpGet(url);
        var exp_result = JSON.parse(buf.toString('utf-8'));
        asyncUpdateDogList(exp_result, filesItems, currentImagesItems);
          
          export_res.status(200).send(exp_result);

      })(dogUrl, res);
  
};
exports.updateListTimer = () => {
 
  (async(url) => {
    /*for(let i=0;i<export_res.length;i++){
      dogListItems.push(export_res[i]);
    }*/
    let filesItems =[];
    let currentImagesItems =[];
      var buf = await httpGet(url);
      var exp_result = JSON.parse(buf.toString('utf-8'));
     // console.log(exp_result);
      asyncUpdateDogList(exp_result, filesItems, currentImagesItems);
        
        

    })(dogUrl);

};
function padZero(string){
  return ("00" + string).slice(-2);
}
function toReadableString(time) {
  if (time < 0)
    time = 0;
  var hrs = ~~(time / 3600 % 24),
    mins = ~~((time % 3600) / 60);
    return hrs + ":" + padZero(mins)
    /*timeType = (hrs > 11 ? "PM" : "AM");
  if (hrs > 12)
    hrs = hrs - 12;
  if (hrs == 0)
    hrs = 12;
  return hrs + ":" + padZero(mins) + timeType;*/
}
exports.list = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
      if (req.query.page) {
          req.query.page = parseInt(req.query.page);
          page = Number.isInteger(req.query.page) ? req.query.page : 0;
      }
  }
  DogsModel.findAll().then(dogs => {
    let _dogs =[];
    dogs.map((dog, j) => {
      let _attributes = [];
    let _name ="";
    let _description ="";
    let _img ="";
    let _background_color="";
    let _external_url="";
    dog._options.attributes.map((attribute, i) => {
      
      if(attribute=="Name"){
        _name=dog[attribute];
      }
      else if(attribute=="BIO"){
        _description=dog[attribute];
      }
      else if(attribute=="Image"){
        _img=dog[attribute];
      }
      else if(attribute=="AgeInWords"){
        let _obj ={};
        _obj["trait_type"]="Age";
        _obj["value"]=dog[attribute];
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }
      }
      else if(attribute=="TopBreedComposition_FullInfo"){
        let _obj ={};
        _obj["trait_type"]="Breed";
        _obj["value"]=dog[attribute];
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }
      }
      else if(attribute=="IsBadger"){
        let _obj ={};
        _obj["trait_type"]=attribute;
        _obj["value"]=dog[attribute];
        /*if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }*/
      }
      else if(attribute=="IsUnicorn"){
        let _obj ={};
        _obj["trait_type"]=attribute;
        _obj["value"]=dog[attribute];
        /*if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }*/
      }
      else if(attribute=="IsPotato"){
        let _obj ={};
        _obj["trait_type"]=attribute;
        _obj["value"]=dog[attribute];
        /*if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }*/
      }
      else if(attribute=="BG"){
        /*let _obj ={};
        _obj["trait_type"]="background_color";
        _obj["value"]=dog[attribute];
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;*/
        _background_color=dog[attribute];
        //}
      }
      else if(attribute=="PurchasePrice"){
        let _obj ={};
        _obj["trait_type"]=attribute;
        _obj["value"]=dog[attribute];
        /*if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }*/
      }
      else if(attribute=="BreedingPrice"){
        let _obj ={};
        _obj["trait_type"]=attribute;
        _obj["value"]=dog[attribute];
        /*if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }*/
      }
      else if(attribute=="Coins"){
        let _obj ={};
        _obj["trait_type"]=attribute;
        _obj["value"]=dog[attribute];
        /*if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }*/
      }
      else if(attribute=="IsSpecialCharacter"){
        let _obj ={};
        _obj["trait_type"]="SpecialCharacter";
        _obj["value"]=(dog[attribute]==1)?"yes":"no";
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }
      }
      else if(attribute=="Generation"){

        
        let _obj ={};
        _obj["trait_type"]="Generation";
        _obj["display_type"]="number";
        _obj["value"]=dog[attribute];
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }
      }
      else if(attribute=="Birthday"){

        
        let _obj ={};
        _obj["trait_type"]="birthday";
        _obj["display_type"]="date";
        _obj["value"]=dog[attribute];
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }
      }
      else if(attribute=="BestTime"){

        
        let _obj ={};
        _obj["trait_type"]="BestTime";
        _obj["value"]=toReadableString(dog[attribute]);
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }
      }
      else{
        let _obj ={};
        _obj["trait_type"]=attribute;
        _obj["value"]=dog[attribute];
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }
      }
      
    });
    /*let _obj ={};
        _obj["trait_type"]="external_url";
        _obj["value"]="http://nftdog.coindogs.com/dog-page/"+dog.DogID;
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }*/
        _external_url="http://nftdog.coindogs.com/dog-page/"+dog.DogID;
    let _dog={
      "name": _name,
      "description": _description,
      "image": _img,
      "background_color":_background_color,
    "external_url":_external_url,
      "attributes": _attributes
    };
    _dogs.push(_dog);
    });
    res.status(200).send(_dogs);
    
    
  });
  

};
exports.ModelList = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
      if (req.query.page) {
          req.query.page = parseInt(req.query.page);
          page = Number.isInteger(req.query.page) ? req.query.page : 0;
      }
  }
  DogsModel.findAll().then(dogs => {
    
    res.status(200).send(dogs);
    
    
  });
  

};
exports.getById = (req, res) => {
  console.log(req.body);
  DogsModel.findOne({
    where: {
      DogID: req.params.dogId
    }
  }).then(dog => {
    let _attributes = [];
    let _name ="";
    let _description ="";
    let _img ="";
    let _background_color="";
    let _external_url="";
    dog._options.attributes.map((attribute, i) => {
      
      if(attribute=="Name"){
        _name=dog[attribute];
      }
      else if(attribute=="BIO"){
        _description=dog[attribute];
      }
      else if(attribute=="Image"){
        _img=dog[attribute];
      }
      else if(attribute=="AgeInWords"){
        let _obj ={};
        _obj["trait_type"]="Age";
        _obj["value"]=dog[attribute];
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }
      }
      else if(attribute=="TopBreedComposition_FullInfo"){
        let _obj ={};
        _obj["trait_type"]="Breed";
        _obj["value"]=dog[attribute];
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }
      }
      else if(attribute=="IsBadger"){
        let _obj ={};
        _obj["trait_type"]=attribute;
        _obj["value"]=dog[attribute];
        /*if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }*/
      }
      else if(attribute=="IsUnicorn"){
        let _obj ={};
        _obj["trait_type"]=attribute;
        _obj["value"]=dog[attribute];
        /*if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }*/
      }
      else if(attribute=="IsPotato"){
        let _obj ={};
        _obj["trait_type"]=attribute;
        _obj["value"]=dog[attribute];
        /*if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }*/
      }
      else if(attribute=="BG"){
        /*let _obj ={};
        _obj["trait_type"]="background_color";
        _obj["value"]=dog[attribute];
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;*/
        _background_color=dog[attribute];
        //}
      }
      else if(attribute=="PurchasePrice"){
        let _obj ={};
        _obj["trait_type"]=attribute;
        _obj["value"]=dog[attribute];
        /*if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }*/
      }
      else if(attribute=="BreedingPrice"){
        let _obj ={};
        _obj["trait_type"]=attribute;
        _obj["value"]=dog[attribute];
        /*if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }*/
      }
      else if(attribute=="Coins"){
        let _obj ={};
        _obj["trait_type"]=attribute;
        _obj["value"]=dog[attribute];
        /*if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }*/
      }
      else if(attribute=="IsSpecialCharacter"){
        let _obj ={};
        _obj["trait_type"]="SpecialCharacter";
        _obj["value"]=(dog[attribute]==1)?"yes":"no";
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }
      }
      else if(attribute=="Generation"){

        
        let _obj ={};
        _obj["trait_type"]="Generation";
        _obj["display_type"]="number";
        _obj["value"]=dog[attribute];
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }
      }
      else if(attribute=="Birthday"){

        
        let _obj ={};
        _obj["trait_type"]="birthday";
        _obj["display_type"]="date";
        _obj["value"]=dog[attribute];
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }
      }
      else if(attribute=="BestTime"){

        
        let _obj ={};
        _obj["trait_type"]="BestTime";
        _obj["value"]=toReadableString(dog[attribute]);
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }
      }
      else{
        let _obj ={};
        _obj["trait_type"]=attribute;
        _obj["value"]=dog[attribute];
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }
      }
      
    });
    /*let _obj ={};
        _obj["trait_type"]="external_url";
        _obj["value"]="http://nftdog.coindogs.com/dog-page/"+dog.DogID;
        if(_obj !={}){
        _attributes[_attributes.length]=_obj;
        }*/
        _external_url="http://nftdog.coindogs.com/dog-page/"+dog.DogID;
    let _dog={
      "name": _name,
      "description": _description,
      "image": _img,
      "background_color":_background_color,
    "external_url":_external_url,
      "attributes": _attributes
    };
    //console.log(dog);
    res.status(200).send(_dog);
    
    
  });
};
exports.ModelGetById = (req, res) => {
  console.log(req.body);
  DogsModel.findOne({
    where: {
      DogID: req.params.dogId
    }
  }).then(dog => {
    
    
    //console.log(dog);
    res.status(200).send(dog);
    
    
  });
};

exports.getChildrenById = (req, res) => {
  console.log(req.body);
  DogsModel.findAll({
    where:{
      [Op.or]:[
     {
      Mom_ID: req.params.dogId
    },
    {
      Dad_ID: req.params.dogId
    }]
  }
  }).then(dogs => {
    res.status(200).send(dogs);
    
    
  });
};
exports.getByOwnerId = (req, res) => {
  console.log(req.body);
  DogsModel.findAll({
    where: {
      Owner_ID: req.params.ownerId
    }
  }).then(dogs => {
    res.status(200).send(dogs);
    
    
  });
};
exports.getSettingsByUserId = (req, res) => {

  SettingsModel.findAll({
    where: {
      userID: req.params.userId
    }
  }).then(settings => {
    res.status(200).send(settings[0]);
  });
    
};
exports.getSettings = (req, res) => {

  SettingsModel.findAll({
    
  }).then(settings => {
    res.status(200).send(settings);
  });
    
};
exports.patchSettingsByUserId = (req, res) => {
  console.log(req.body);
  
  SettingsModel.update(
    {Email: req.body.Email, Phone: req.body.Phone},
    {

    where: {
      userID: req.params.userId
    }
  }).then(function (result) {
    res.status(200).send(result);

});
};

exports.postSettingsByUserId = (req, res) => {
  console.log(req.body);
  SettingsModel.findOne({
    where: {
      userID: req.params.userId
    }
  }).then(setting => {
    if(!setting){
      SettingsModel.create(
        
        {
          UserID :req.params.userId,
          Email: "", 
          Phone: "",
          UserImage:null
        }
      )
      .then(function (result) {
        res.status(200).send(result);
    
    })
    }
    
  });
  
  
};

/*exports.removeById = (req, res) => {
    DogModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
}*/