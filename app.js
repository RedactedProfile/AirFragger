var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

mongoose.connect('mongodb://localhost:27017/airfragger', function(error) {
    if(error) {
        console.log(error);
    }
});
var expressSession = require('express-session');
app.use(expressSession({
    key: 'session',
    secret: 'a1rFraGg3RS3Cr3t',
    store: require('mongoose-session')(mongoose)
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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



app.locals.getGravatar = function(email, size) {
  var md5 = require('MD5');
  if(typeof size == "undefined" || !size)
    size = 40;

  var emailHash = md5(email).toLowerCase();
  var defaultAvatar = encodeURIComponent();
  return "http://www.gravatar.com/avatar/" + emailHash + "?s=" + size;
};

app.locals.renderDate = function(date, format) {
  var moment = require('moment');

  if(typeof format == "undefined" || !format)
    format = "MM/DD/YYYY";

  return moment(date, 'X').format(format) ;
};

app.locals.renderFromNow = function(date) {
  var moment = require('moment');
  return moment(date, "X").fromNow();
};

app.locals.getSession = function() {
  console.log(expressSession);
};


module.exports = app;
