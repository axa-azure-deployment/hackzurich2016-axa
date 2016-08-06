var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*swagger
var url = require("url");
var swagger = require("swagger-node-express");
*/

// add mongo connection
var mongo = require('mongodb');
var monk = require('monk');

// Connect to remote DB
var db = monk('HackZurich2016-user:password@40.68.213.58:27018/hackzurich2016-axa');

// CORS issues
var cors = require('express-cors')

var routes = require('./routes/index');
var axa = require('./routes/axa');
var users = require('./routes/users');

var app = express();

/* swagger
app.use(express.json());
app.use(express.urlencoded());
swagger.setAppHandler(app);
*/

app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(cors({
    "origin": false,
    "allowedOrigins" : [
        'http://localhost:8080', 'http://127.0.0.1:8080', 'http://petstore.swagger.io', '*'
    ]
}))
app.use(express.static(path.join(__dirname, 'public')));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/axa', axa);
app.use('/test', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
