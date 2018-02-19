var http = require('http'),
    fs = require('fs');
    // util = require('util');

const opn = require('opn');
const filesDir = './files/';

var files = ['files/demo.mp4', 'files/demo2.mp4'];
var currentFile = 0;

http.createServer(function (req, res) {
  var path = files[currentFile];
  var stat = fs.statSync(path);
  var total = stat.size;
  
  console.log('ALL: ' + total);
  res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
  fs.createReadStream(path).pipe(res);
  
  if(currentFile >= (files.length-1)){
	  console.log('herer');
	  currentFile = 0;
  }else{
	  currentFile++;
  }
  
}).listen(1337, '127.0.0.1');
console.log('Server running at 	http://127.0.0.1:1337/');

// opn	('http://127.0.0.1:1337/', function (err) {
  // if (err) throw err;
  // console.log('The user closed the browser');
// });