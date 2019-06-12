var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.render('index',{title:"platter"});
});

app.post('/resultspage', function(req, res, next){
  res.render('resultspage', {title:"Form Data",url:req.body.url,coms : req.body.text});
});

// function processFormData(req,res,next){
//   res.render('resultspage',
//      {title:"Form Submission", coms:req.body.text});
// }

// app.post('/resultspage', processFormData);

//print out the data after getting it

app.get('/griddemo', function(req, res, next) {
  res.render('griddemo',{title:"platter"});
});
// app.use('/', indexRouter);  // this is how we use a router to handle the / path
// but here we are more direct

app.get('/personalhtml', function(req, res, next) {
  res.render('personalhtml',{title:"personal"});
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // if(req.route.path === '/resultspage'){
  //   return res.render('resultspage', {coms : req.body.text})
  // }
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
