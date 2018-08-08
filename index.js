var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp-camp");
seedDB();

//Schema Setup

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("campgrounds/landing");
})

app.get("/campgrounds", function (req, res) {
    // get ll campgrounds from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds })
        }
    })

})

app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new")
})

app.post("/campgrounds", function (req, res) {
    //get data from form and add to campgrounds array
    //redirect back to campground page
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description };
    // create a new campground to save in the db
    Campground.create(newCampground, function (err, Campground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("campgrounds");
        }
    })

})

app.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(
        function (err, found) {
            if (err) {
                console.log(err);
            } else {
                console.log(found);
                res.render("campgrounds/show", { campground: found });
            }
        })
})

//==============================
// Comments Routes
//==============================

app.get("/campgrounds/:id/comments/new", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        res.render("comments/new", { campground: campground });
    })

})


app.listen(3000, function () {
    console.log("the yelpcamp is working");
});