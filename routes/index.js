var express = require("express");
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');
const connectEnsureLogin = require('connect-ensure-login');
var middleware = require('../middleware/auth');
var data = require('../data.js');
var hotels = require('../hotel.js');
var rooms = require("../rooms.js");
var index = 0;


router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/sites', (req, res)=>{
    res.render('site');
});


////////////////////////////////////////////////////
router.get('/hotel', (req, res)=>{
    res.render('hotel');
})

router.get('/hotel/:id', (req, res)=>{
    var id = req.params.id;
    res.render("hotelInfo", {name: hotels[id].name, src: hotels[id].src, rooms: rooms});
})

router.get('/hotel/:id/:room', (req, res)=>{
    var room = req.params.room;
    res.send(rooms[room]);
})
//////////////////////////////////////////////////////////////////////

router.get('/book', middleware.isLoggedIn , (req, res)=>{
    res.render("booking");
});

 //AUTH ROUTES
 router.get('/register', (req, res)=>{
    res.render('./auth/register')
});
router.post('/register', (req, res)=>{
    // console.log(req.body.username);
    var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, (err, user)=>{
       if(err){
           console.log(err);
           return res.render("./auth/register");
       }
       passport.authenticate('local')(req, res, ()=>{
           res.redirect("/book");
       });
   });
});

router.get("/sites/:id", (req, res)=>{
    var id = req.params.id;
    res.render("place", {image: "img"+data[id].imageId+".png", name: data[id].name, src: data[id].src});
});


//Login
router.get("/login", function(req, res){
    res.render('./auth/login', {'fail': req.query.failed});
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
    }),      (req, res)=>{
        next();
});

    //logout route
    router.get('/logout', (req, res)=>{
        req.logOut();
        res.redirect('/');
    });


module.exports = router;