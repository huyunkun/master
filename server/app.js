var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const crypto = require('crypto');
// const cookieParser = require('cookie-parser')
const session = require('express-session')

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
app.use(cors())

// app.use(cookieParser())//启用cookie
app.use(session({//启用session
  secret:'12345',
  cookie:{maxAge:60*1000*30},
  resave:false,
  saveUninitialized:true
}))
//接收post数据
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.use(multer()); // for parsing multipart/form-data

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(cors({//跨域处理
  origin:['http://localhost:8080'],
  methods:['GET','POST'],
  alloweHeaders:['Conten-Type', 'Authorization']
}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//mongodb 连接
mongoose.connect('mongodb://localhost/webAppTest')
.then(() => {
  console.log('连接成功')
})
.catch(err => {
  console.log(err)
})

module.exports = app;
