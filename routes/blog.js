const express = require('express');
const router = express();
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const Url=require('../config/keys')
const seedDB=require('../seeds')
router.use(methodOverride("_method"))
mongoose.connect(Url.url);
router.use(bodyparser.urlencoded({
    extended: true
}));
const blogs=require('../models/campground');
seedDB();

router.get('/', (req, res) => {
    'use strict';
    blogs.find({}, (err, blog) => {
        if (err) {
            console.log(err);
        } else {
            console.log(blog);
            res.render('home', {
                blogs: blog
            })
        }
    })
});
router.get('/new', (req, res) => {
    'use strict';
    res.render('newblog');
})
router.post('/new', (req, res) => {
    'use strict';
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    blogs.create({
        title: title,
        image: image,
        description: description,
        date: new Date().toString()
    }, (err, blog) => {
        if (err) {
            console.log(err)
        } else {
            console.log(blog);
            res.redirect('/blogs')
        }
    })
})
router.get('/id/:id', (req, res) => {
    'use strict';
    console.log(req.params.id)
    blogs.findById(req.params.id).populate("comments").exec(function(err, blog){
        if(err){
            console.log(err);
        } else {
            console.log(blog.title)
            //render show template with that campground
            res.render("blog_id", {blogs: blog});
        }
    });
})
router.get('/edit/:id', (req, res) => {
    'use strict';
    blogs.findById(req.params.id, (err, blog) => {
        if (err) {
            console.log(err);
        } else {
            res.render('edit', {
                blogs: blog
            });
        }
    })
})
router.put("/edit/:id", (req, res) => {
    'use strict';
    console.log(req.body.description)
    blogs.findByIdAndUpdate(req.params.id,{title:req.body.title,description:req.body.description}, function (err, blog) {
        if (err) {
            console.log(err);
        } else {
            const showUrl = "/blogs/id/" + blog._id;
            res.redirect(showUrl)
        }
    });
});

router.delete('/:id/delete',(req,res)=>{
    "use strict"
    blogs.findById(req.params.Id,(err,blog)=>{
        if(err){
            console.log(err);
        }
        else{
            blog.remove().remove();
            console.log(blog)
        }
        res.redirect('/blog');
    })
})

module.exports = router;
