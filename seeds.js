var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment =require("./models/comment");
var data =[
    {
        name:"cloud's Rest",
        image:"https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144296f7c478a0efb0_340.jpg",
        description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum magnam, doloribus pariatur tempore veniam illo commodi tempora delectus sit numquam necessitatibus cupiditate culpa laboriosam optio ipsa sunt quas alias minus"
    
    },
    {
        name:"nighty",
        image:"https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144296f7c478a0efb0_340.jpg",
        description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum magnam, doloribus pariatur tempore veniam illo commodi tempora delectus sit numquam necessitatibus cupiditate culpa laboriosam optio ipsa sunt quas alias minus?"
    },
    {
        name:"mountain",
        image:"https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104496f3c67ca6eab7bd_340.jpg",
        description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum magnam, doloribus pariatur tempore veniam illo commodi tempora delectus sit numquam necessitatibus cupiditate culpa laboriosam optio ipsa sunt quas alias minus?"
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