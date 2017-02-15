var express = require('express');
var mongoose = require('mongoose');
var path = require("path");
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var app = express();
var Report = require('./models/reportModel');
var reportRouter = require('./routes/reportRouter')(Report);

//DB CONNECTION
var db = mongoose.connect('mongodb://localhost/reportAPI');

//MIDDLEWARE CONFIGURATION
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Add headers
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', false);
	// Pass to next layer of middleware
	next();
});
app.use('/api', reportRouter);

//SERVE
var port = process.env.PORT || 8080;
app.listen(port, function(){
	console.log('Gulp is running the app in port  ' + port);
});
