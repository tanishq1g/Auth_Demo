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
app.use(bodyParser.urlencoded({extended: true}))



app.use(require('express-session')({
    secret: "some secret message",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
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


// AUTH ROUTES


//show signup form
app.get('/signup',function(req,res){
    res.render('signup')
})

//handling user signup form
app.post('/signup',function(req,res){
    console.log('signup post route')
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log('auth error')
            return res.render('signup')
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('secret')
        })
    })
})



//LOGIN ROUTES

app.get('/login',function(req,res){
    res.render('login')
})

    //middleware
app.post('/login', passport.authenticate('local' ,{
    successRedirect : '/secret',
    failureRedirect : '/login'
}),function(req,res){

})

//LOGOUT ROUTES

app.get('/logout',function(req,res){
    req.logout()
    res.redirect('/')
})


app.listen(3000, function(){
    console.log('auth_demo server started');
})
