"use strict";
let express = require ('express');
let bodyParser = require('body-parser');
let ejs = require('ejs');
let path = require('path');
let expressValidator = require('express-validator');
let session = require('express-session');
let profileController = require('./controllers/profile_controller');
let app = express();
let http = require('http');

// Fire profile Controller
profileController(app);

let port = 5000;
app.listen(port, function(){
    console.log("Server is running on port " + port);
})
// Routes Section
let index = require('./controllers/index');


// Static folder path
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(session({secret: 'max', saveUninitialized: false, resave: false}));



// Middle ware Section
app.set('view engine', 'ejs')

// Use Section
app.use('/', index);
