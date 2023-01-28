var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataRouter=require('./routes/data');
const mongoose=require('mongoose');
const bodypaser=require('body-parser');

mongoose.connect('mongodb://localhost:27017/socialMedia',{ useNewUrlParser:true,useUnifiedTopology:true,},
(err)=>{
    if(err){
    console.log("error in connection");
}else{
    console.log("connection established");
}
}
)

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user',dataRouter);


module.exports = app;
