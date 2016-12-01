var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var app = express();

var bookRouter = express.Router();

bookRouter.route('/Books')
	.get(function(req, res){
		var getBooksJson = {hello: "This is my first JSON response from the api!"}
		res.json(getBooksJson);
	})

app.use('/api', bookRouter);

var port = process.env.PORT || 8080;

app.listen(port, function(){
	console.log('Gulp is running the app in port  ' + port);
});
