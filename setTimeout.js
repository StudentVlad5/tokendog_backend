const DogsController = require('./dogs/controllers/dogs.controller');
setInterval(function() {
    console.log(`updating dog start`);

    return DogsController.updateListTimer();
}, 300000);