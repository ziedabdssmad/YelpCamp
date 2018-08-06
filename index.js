var express = require("express");
var app = express();
var bodyParser =require("body-parser");
var campgrounds =[
    {name:"Salmon Creek", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f3c57ea4e5b4b8_340.jpg"},
    {name:"Granite Hill", image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f3c57ea4e5b4b8_340.jpg"},
    {name:"Mountain Goat's Rest", image:"https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144296f4c67aafecb5_340.jpg"}
]

app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
})

app.get("/campgrounds", function (req, res) {

    res.render("campgrounds",{campgrounds:campgrounds})
})

app.get("/campgrounds/new",function (req,res) {
    res.render("new")
})

app.post("/campgrounds",function (req,res) {
    //get data from form and add to campgrounds array
    //redirect back to campground page
    var name=req.body.name;
    var image=req.body.image;
    var newCampground={name:name , image:image};
    campgrounds.push(newCampground);
    res.redirect("campgrounds");
})

app.listen(3000, function () {
    console.log("the yelpcamp is working");
});