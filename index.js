// var express = require('express');
// var http = require('http');
// var gzippo = require('gzippo');

// var app = express();
// app.use(gzippo.staticGzip('' + __dirname));
// app.use('/*', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// var server = http.createServer(app);
// server.listen(process.env.PORT || 5000);

var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.use(express.logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);