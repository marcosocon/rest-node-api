var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var app = express();

app.get('/', function(req, res){
	res.send('Hello!');
});

app.listen(8080, function(){
	console.log('Server running on port 8080');
});
