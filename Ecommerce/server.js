var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var User = require('./models/user');

var app = express();

mongoose.connect('mongodb+srv://root:DJ16@djecommerce-jrlkb.mongodb.net/test?retryWrites=true',function(err){
  if(err) {
    console.log(err);
  }
  else {
    console.log("Connected to the database");
  }
});

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create-user',function(req, res, next){
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  user.save(function(err){
    if(err) return next(err);
    res.json("Successfully Created A New User!");
  });
});

app.listen(3000,function(err) {
  if(err) throw err;
  console.log("Server is Connected at port 3000");
});


//mongoose: object relational mapper i.e virtual object DB, connects JS n Mongo DB.
