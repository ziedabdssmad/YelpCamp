var express =require("express");
var router =express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.get("/", function (req, res) {
    // get ll campgrounds from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.user);
            res.render("campgrounds/index", { campgrounds: allCampgrounds })
        }
    })

})

router.get("/new", function (req, res) {
    res.render("campgrounds/new")
})

router.post("/", function (req, res) {
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

router.get("/:id", function (req, res) {
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

module.exports = router;