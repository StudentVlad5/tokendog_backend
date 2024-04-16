const express = require('express')
// const config = require('./common/config/env.config.js');
const app = express();
require("dotenv").config();
const logger = require("morgan");
const cors = require("cors");
//const port = 8000;

const { port = 8000 } = process.env;
const DogsRouter = require('./dogs/routes.config');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use('/public', express.static(__dirname + '/public'));
//console.log("YYYYYYYYY")
app.get('/', (req, res) => {
  res.send('Hello Crypto Dog!')
});
/*var publicDir = require('path').join(__dirname,'/public'); 
app.use(express.static(publicDir));*/

/*app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });*/
   //const path = require('path')
//app.use('/static', express.static(path.join(__dirname, 'public')))

DogsRouter.routesConfig(app);
//app.use(express.static('public'));
//app.use('/static', express.static('public'));
//app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});