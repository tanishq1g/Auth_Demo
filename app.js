var express = require('express')
var mongoose = require('mongoose')

var passport = require('passport')
var bodyParser = require('body-parser')
var localStrategy = require('passport-local')
var passportLocalMongosoe = require('passport-local-mongoose')

var user = require('./models/user')

mongoose.connect('mongodb://localhost/auth_demo_app')

var app = express()

app.set('view engine','ejs')

app.get('/',function(req,res){
    res.render('home')
})

app.get('/secret',function(req,res){
    res.render('secret')
})

app.listen(3000, function(){
    console.log('auth_demo server started');
})
