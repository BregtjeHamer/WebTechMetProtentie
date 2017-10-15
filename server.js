var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');

var app = express();
var secureRoutes = express.Router();

//controllers
var dataController = require('./controllers/data-controller');
var authenticateController = require('./controllers/authenticate-controller');

process.env.SECRET_KEY = "mybadasskey";

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/secure-api', secureRoutes);

var config = require('./config/config');
config.setConfig();

mongoose.connect(process.env.MONGOOSE_CONNECT);


app.get('/api/authenticate', authenticateController.authenticate);
//users ophalen
app.get('/api/get-users', dataController.getData);


//user ingelogd,, authenticate, secure
secureRoutes.use(function (req, res, next) {
    var token = req.body.token || req.headers['token'];

    if (token) {
        //token testenç
        jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
            if (err) {
                res.status(500).send("Invalid token");
            } else {
                next();
            }

        })
    } else {
        res.send("stuur aub een token");
    }
});

//user registreren

//running
app.listen(3000, function () {
    console.log("server is up");
});