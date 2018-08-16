var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var passport =require("passport");
var LocalStrategy=require("passport-local");
var User =require("./models/user");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/index");
 
mongoose.connect("mongodb://localhost/yelp-camp");
//seedDB();

//Schema Setup

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"))

// Passport Config

app.use(require("express-session")({
    secret:"hello world",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req,res,next) {
    res.locals.currentUser=req.user;
    next();
})

app.use(authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(3000, function () {
    console.log("the yelpcamp is working");
});