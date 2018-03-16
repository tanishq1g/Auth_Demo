var express = require('express')
var mongoose = require('mongoose')

var passport = require('passport')
var bodyParser = require('body-parser')
var localStrategy = require('passport-local')
var passportLocalMongosoe = require('passport-local-mongoose')

var User = require('./models/user')

mongoose.connect('mongodb://localhost/auth_demo_app')

var app = express()

app.set('view engine','ejs')




app.use(require('express-session')({
    secret: "some secret message",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// =================
// ROUTES
// =================

app.get('/',function(req,res){
    res.render('home')
})

app.get('/secret',function(req,res){
    res.render('secret')
})

app.get('/signup',function(req,res){
    res.render('signup')
})


app.listen(3000, function(){
    console.log('auth_demo server started');
})
