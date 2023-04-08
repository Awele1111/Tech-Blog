// const router = require('express').Router();
// const {Comment, Post, User } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//   // Render the homepage with a list of posts
//   try {
//     // Get all projects and JOIN with user data
//     const postData = await Post.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });


// const posts = postData.map((post) => post.get({plain:true}));

//   res.render('homepage', {
    
//   });
// });


// router.get('/login', (req, res) => {
//   // Render the login page
//   res.render('login');
// });

// router.get('/signup', (req, res) => {
//   // Render the signup page
//   res.render('signup');
// });

// module.exports = router;

const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// get all posts for a homepage
router.get("/", (req, res) => {
    console.log("=====================");
    Post.findAll({
        attributes: [
            "id", 
            "title", 
            "body",
            "created_at"
        ], 
        include: [
            {
                model: Comment, 
                attributes: [
                    "id", 
                    "comment_text", 
                    "user_id", 
                    "post_id", 
                    "created_at",
                ], 
                include: {
                    model: User,
                    attributes: ["username"],
                }, 
            }, 
            {
                model: User, 
                attributes: ["username"],
            }
        ]
    })
    .then(dbPostData => {
        // loop over each seqeulize object, saving the results to a new posts array
        const posts = dbPostData.map(post => post.get({ plain: true }));

        // pass a single post object into the homepage template
        res.render("homepage", {
            posts,
            loggedIn: req.session.loggedIn,
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// get one post for a homepage
router.get("/post/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: [
            "id", 
            "title", 
            "body",
            "created_at", 
        ],
        include: [
            {
                model: Comment, 
                attributes: [
                    "id", 
                    "comment_text", 
                    "user_id", 
                    "post_id",
                    "created_at",
                ], 
                include: {
                    model: User, 
                    attributes: ["username"],
                },
            },
            {
                model: User, 
                attributes: ["username"]
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        };

        // serialize the data
        const post = dbPostData.get({ plain: true });

        // pass data to template
        res.render("single-post", {
            post, 
            loggedIn: req.session.loggedIn,
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// login 
router.get("/login", (req, res) => {
    // if logged in, redirect to homepage
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    };
    res.render("login");
});

// exports
module.exports = router;

