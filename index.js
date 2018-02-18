var express = require("express");
var app     = express();
var path    = require("path");
var http	= require('http');
var fs		= require('fs');
var readdir = require('fs-readdir-promise');

const filesDir = './files/';

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
	res.render("index", { name: "example" });
});

app.get("/getFiles", function(req, res){
	// res.json({ name: "example" });
	 
	var onRejected = function(err) {
	  console.log(err);
	  console.log('Cannot read the file.');
	};
	
	readdir(filesDir).then(function(files) {
		res.json(files);
	}, onRejected);
	
	// fs.readdirSync(filesDir).then(file => {
		// console.log(file);
	// })
});

app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/js'));

app.listen(8888);

console.log("Running at Port 8888");