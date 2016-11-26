var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var app = express();

app.get('/', function(req, res){
	res.send('Hello!');
});

var port = process.env.PORT || 8080;

app.listen(port, function(){
	console.log('Server running on port ' + port);
});
