var express = require('express');
var mongoose = require('mongoose');
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
var Report = require('./models/reportModel');
var reportRouter = require('./routes/reportRouter')(Report);

//DB CONNECTION
var db = mongoose.connect('mongodb://localhost/reportAPI');

//MIDDLEWARE CONFIGURATION
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', reportRouter);

//SERVE
var port = process.env.PORT || 8080;
app.listen(port, function(){
	console.log('Gulp is running the app in port  ' + port);
});
