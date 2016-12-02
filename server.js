var express = require('express');
var mongoose = require('mongoose');
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
var Book = require('./models/bookModel');
var bookRouter = require('./routes/bookRoutes')(Book);

//DB CONNECTION
var db = mongoose.connect('mongodb://localhost/bookAPI');

//MIDDLEWARE CONFIGURATION
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', bookRouter);

//SERVE
var port = process.env.PORT || 8080;
app.listen(port, function(){
	console.log('Gulp is running the app in port  ' + port);
});
