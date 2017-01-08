////////////////////////////////////////////////////////////////////////
//                          Modules                                   //
////////////////////////////////////////////////////////////////////////
var express        = require('express');
var path           = require('path');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var http           = require('http');


////////////////////////////////////////////////////////////////////////
//                          Dependencies                              //
////////////////////////////////////////////////////////////////////////
var index          = require('./routes/index');
var config         = require('config');

var app            = express();

////////////////////////////////////////////////////////////////////////
//                          App configuration                         //
////////////////////////////////////////////////////////////////////////
app.use(logger('dev'));
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
app.use(cookieParser());

app.post('/ping',         function (req, res) {
    res.send(200, {}, { pong: true });
});

app.use('/',       index);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
httpServer = http.createServer(app).listen(config.get('httpPort'), function() {
    console.log('Express HTTP server listening on port ' + config.get('httpPort'));
});

module.exports = app;
