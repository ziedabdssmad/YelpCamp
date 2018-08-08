var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment =require("./models/comment");
var data =[
    {
        name:"cloud's Rest",
        image:"https://pixabay.com/get/e834b70c2cf5083ed1584d05fb1d4e97e07ee3d21cac104496f3c77cafefb6b0_340.jpg",
        description:"spring campground"
    },
    {
        name:"nighty",
        image:"https://pixabay.com/get/e83db80d2cfd053ed1584d05fb1d4e97e07ee3d21cac104496f3c77cafefb6b0_340.jpg",
        description:"this is a nighty camp"
    },
    {
        name:"mountain",
        image:"https://pixabay.com/get/e036b80a20fc1c22d2524518b7444795ea76e5d004b0144296f6c471a5eebd_340.jpg",
        description:"this is a mountain camp"
    }
]
function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campground");
        data.forEach(function (seed) {
            Campground.create(seed,function (err,campground) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("added a campground"); 
                    Comment.create(
                        {
                             text:"this place is great but ...",
                             author:"homer"
                        },function (err,comment) {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("comment created");
                        }
                    )
                }
            })
        })
    })

    //add few campground

    
}

module.exports = seedDB;