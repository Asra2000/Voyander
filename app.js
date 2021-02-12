var express = require("express"),
    app = express(),
    path = require('path'),
    bodyParser = require("body-parser"),
    passport = require("passport"), 
    mongoose = require ("mongoose"),
    User   = require('./models/users');
    var indexRoutes = require("./routes/index");


app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SETTING UP MONGO DB
mongoose.connect('mongodb://localhost/voyander_users',
  { useNewUrlParser: true, useUnifiedTopology: true });
//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: "Asra doesn't give damn",
    resave : false,
    saveUninitialized : false
}));
/* PASSPORT LOCAL AUTHENTICATION */

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session()); // initializing the session auth middleware


//global middleware
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use("/", indexRoutes);

// setting the port
app.listen(process.env.PORT||3000, ()=>{
    console.log("listening");
})