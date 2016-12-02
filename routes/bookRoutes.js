var express = require('express');

//ROUTES FOR BOOKS.
var routes = function(Book){
	var bookRouter = express.Router();
	bookRouter.use('/:bookId', function(req, res){
		Book.findById(req.params.bookId, function(err, book, next){
			if(err){
				res.status(500).send(err);
			} else if(book) {
				res.book = book;
				next();
			} else {
				res.status(404).send('Book not found.')
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
			req.book.title = req.body.title
			req.book.author = req.body.author
			req.book.genre = req.body.genre
			req.book.read = req.body.read;
			req.book.save(function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.json(req.book);
				}
			});
		})
		.patch(function(req, res){
			if(req.body._id){
				delete req.body._id;
			}
			for(var i in req.body){
				req.book[i] = req.body[i];
			}
			req.book.save(function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.json(req.book);
				}
			});
		})
		.get(function(req, res){
			res.json(req.book);
		});
	return bookRouter;
}
module.exports = routes;