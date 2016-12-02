var express = require('express');
var mongoose = require('mongoose');
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
var Book = require('./models/bookModel');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var bookRouter = express.Router();

bookRouter.route('/books')
	.get(function(req, res){
		var query = {};
		if(req.query.author) query.author = req.query.author;
		if(req.query.genre) query.genre = req.query.genre;
		if(req.query.read) query.read = req.query.read;
		if(req.query.title) query.title = req.query.title;
		
		Book.find(query, function(err, books){
			if(!err){
				res.json(books);
			} else {
				res.status(500).send(err);
			}
		});
	});
bookRouter.route('/books/:bookId')
	.get(function(req, res){
		Book.findById(req.params.bookId, function(err, book){
			if(!err){
				res.json(book);
			} else {
				res.status(500).send(err);
			}
		});
	});

app.use('/api', bookRouter);

var port = process.env.PORT || 8080;

app.listen(port, function(){
	console.log('Gulp is running the app in port  ' + port);
});
