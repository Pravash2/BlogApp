const mongoose = require("mongoose");
const Campground = require("./models/campground");
const comments   = require("./models/comment");

const data = [
    {
        title: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah",
        date: new Date().toString()
    },
    {
        title: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "blah blah blah",
        date: new Date().toString()
    },
    {
        title: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah",
        date: new Date().toString()
    }
]

function seedDB(){
   //Remove all campgrounds
   "use strict"
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    comments.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
