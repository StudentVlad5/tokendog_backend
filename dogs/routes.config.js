const DogsController = require('./controllers/dogs.controller');
const AccessoriesController = require('./controllers/accessories.controller');
//const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
//const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');
const EffectsController = require('./controllers/effects.controller');
const AccessoryEffectsController = require('./controllers/accessoriesEffect.controller');
const MintsController = require('./controllers/mints.controller')
const SetsController = require('./controllers/sets.controller');
const TransactionsController = require('./controllers/transactions.controller');

const SettingController = require ('./controllers/settings.controller');
const AccessoryDogsModel = require('./controllers/accessoryDogs.controller')
const AccessoryOwnerModel = require('./controllers/accessoryOwner.controller');


//const ADMIN = config.permissionLevels.ADMIN;
//const PAID = config.permissionLevels.PAID_USER;
//const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
   app.post('/authorize', [
        DogsController.authorize
    ]);
    app.get('/dogs', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        DogsController.list
    ]);
    app.get('/updateDogs', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        DogsController.updateList
    ]);
    app.get('/updateFile', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        DogsController.uploadFile
    ]);
    app.get('/dogs/:dogId', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        DogsController.getById
    ]);
    app.get('/dogsModel', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        DogsController.ModelList
    ]);
    app.get('/dogsModel/:dogId', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        DogsController.ModelGetById
    ]);
    app.get('/dogs/getchildren/:dogId', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        DogsController.getChildrenById
    ]);
    app.get('/dogs/getByOwner/:ownerId', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        DogsController.getByOwnerId
    ]);
    app.get('/settings', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        DogsController.getSettings
    ]);
    app.get('/settings/:userId', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        DogsController.getSettingsByUserId
    ]);
    app.patch('/settings/:userId', [
        /*ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,*/
        DogsController.patchSettingsByUserId
    ]);
    app.post('/settings/:userId', [
        /*ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,*/
        DogsController.postSettingsByUserId
    ]);

    app.get('/accessories', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        AccessoriesController.list
    ]);
    app.get('/accessories/:accessoryID', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        AccessoriesController.getById
    ]);
    app.get('/accessories/getBySetID/:setID', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        AccessoriesController.getBySetId
    ]);
    app.get('/accessories/getEffectsById/:accessoryID', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        AccessoriesController.getEffectsById
    ]);
    app.get('/accessories/getMintsById/:accessoryID', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        AccessoriesController.getMintsById
    ]);
    app.get('/sets', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        AccessoriesController.sets
    ]);
    app.get('/sets/:setID', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        AccessoriesController.getSetById
    ]);



   //-Accessories
    app.post('/accessories',[
        AccessoriesController.createAssocciation
    ]);
    
    app.delete('/accessories/:accessoryID',[
        AccessoriesController.deleteAssocciation
    ])
    app.put('/accessories/:accesID',[
        AccessoriesController.updateAssocciation
    ])


  //--accesoryEffect
  app.post('/accessoriesEffect',[

      AccessoryEffectsController.accessoryEffectsCreate
  ])
  app.delete('/accessoriesEffect/:accesID',[
      AccessoryEffectsController.deleteAccessoryEffect
  ])
  app.put('/accessoriesEffect/:accesID',[
    AccessoryEffectsController.updateAssocciationEffect
   ])


  //--acessoryDogs
  app.post('/accessoryDogs',[
    AccessoryDogsModel.accessoryDogsCreate
    ])
  app.delete('/accessoryDogs/:accessDogID',[
    AccessoryDogsModel.deleteAccessoryDogs
])
app.put('/accessoryDogs/:accessDogID',[
    AccessoryDogsModel.updateAssocciationDogs
   ])

//--accessoryOwner
app.post('/accessorySeting',[
    AccessoryOwnerModel.accessoryOwnerCreate
])
app.delete('/accessorySeting/:accessOwnerID',[
   AccessoryOwnerModel.deleteAccessoryOwners

])
app.put('/accessorySeting/:accessOwnerID',[
    AccessoryOwnerModel.updateAssocciationOwner
 
 ])

    //-Effect
    app.post('/effects',[
        EffectsController.effectsCreate
    ])
    app.delete('/effect/:effectID',[
        EffectsController.deleteEffect
    ])
    app.put('/effect/:effectID',[
        EffectsController.updateEffects
    ])
 //-Mints
 app.post('/mints',[
     MintsController.MintsCreate
 ])
 app.delete('/mints/:mintID',[
     MintsController.deleteMints
 ])
 app.put('/mints/:mintID',[
    MintsController.updateMints
])


 ///-sets
 app.post('/sets',[
    SetsController.SetsCreate
 ])
 app.delete('/sets/:setsID',[
     SetsController.deleteSets
 ])
 app.put('/sets/:setsID',[
    SetsController.updateSets
])

//-setting
app.post('/setting',[
    SettingController.SettingCreate
])

app.delete('/setting/:settingID',[
    SettingController.deleteSetting
])
app.put('/setting/:settingID',[
    SettingController.updateSettings
])
//-transactions

app.get('/transactionsGetByUserID/:userID',[
    TransactionsController.TransactionsGet
])
app.get('/transactions/:guid',[
    TransactionsController.TransactionsGetByGuid
])
app.post('/transactions/:guid',[
    TransactionsController.TransactionsCreate
])
app.delete('/transactions/:guid',[
    TransactionsController.TransactionsDelete
])
app.put('/transactions/:guid',[
    TransactionsController.TransactionsUpdate
])




    
    /*app.delete('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.removeById
    ]);*/
};