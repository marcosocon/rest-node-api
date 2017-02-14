var express = require('express');

//ROUTES FOR BOOKS.
var routes = function(Book){
	var bookRouter = express.Router();
	bookRouter.use('/books/:bookId', function(req, res, next){
		Book.findById(req.params.bookId, function(err, book){
			if(err){
				res.status(500).send(err);
			} else if(book) {
				res.book = book;
				next();
			} else {
				res.status(404).send('Book not found.');
			}
		});
	});

	bookRouter.route('/books')
		.post(function(req, res){
			var book = new Book(req.body);
			book.save();
			res.status(201).json(book);
		})
		.get(function(req, res){
			var query = {};
			if(req.query.author) {query.author = req.query.author;}
			if(req.query.genre) {query.genre = req.query.genre;}
			if(req.query.read) {query.read = req.query.read;}
			if(req.query.title) {query.title = req.query.title;}

			Book.find(query, function(err, books){
				if(!err){
					res.json(books);
				} else {
					res.status(500).send(err);
				}
			});
		});
	bookRouter.route('/books/:bookId')
		.put(function(req, res){
			res.book.title = req.body.title;
			res.book.author = req.body.author;
			res.book.genre = req.body.genre;
			res.book.read = req.body.read;
			res.book.save(function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.json(res.book);
				}
			});
		})
		.patch(function(req, res){
			if(req.body._id){
				delete req.body._id;
			}
			for(var i in req.body){
				res.book[i] = req.body[i];
			}
			res.book.save(function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.json(res.book);
				}
			});
		})
		.get(function(req, res){
			res.json(res.book);
		});
	return bookRouter;
};
module.exports = routes;