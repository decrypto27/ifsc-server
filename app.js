////////////////////////////////////////////////////////////////////////
//                          Modules                                   //
////////////////////////////////////////////////////////////////////////
var express        = require('express');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var http           = require('http');


////////////////////////////////////////////////////////////////////////
//                          Dependencies                              //
////////////////////////////////////////////////////////////////////////
var index          = require('./routes/index');
var config         = require('config');
var processor      = require('./routes/processor');

var app            = express();// app init
//added a comment
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
////////////////////////////////////////////////////////////////////////
//                          Server configuration                      //
////////////////////////////////////////////////////////////////////////

httpServer = http.createServer(app).listen(config.get('httpPort'), function() {
    console.log('Express HTTP server listening on port ' + config.get('httpPort'));
});

module.exports = app;
