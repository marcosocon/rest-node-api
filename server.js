var express = require('express');
var mongoose = require('mongoose');
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
var Book = require('./models/bookModel');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var bookRouter = express.Router();

bookRouter.route('/Books')
	.get(function(req, res){
		Book.find(function(err, books){
			if(!err){
				res.json(books);
			} else {
				res.status(500).send(err);
			}
		});
	})

app.use('/api', bookRouter);

var port = process.env.PORT || 8080;

app.listen(port, function(){
	console.log('Gulp is running the app in port  ' + port);
});
