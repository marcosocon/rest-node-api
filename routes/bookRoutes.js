var express = require('express');

//ROUTES FOR BOOKS.
var routes = function(Book){
	var bookRouter = express.Router();

	bookRouter.route('/books')
	.post(function(req, res){
		var book = new Book(req.body);
		book.save();
		res.status(201).json(book);
	})
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
	return bookRouter;
}
module.exports = routes;