const router = require('express').Router();
const {Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // Render the homepage with a list of posts
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });


const posts = postData.map((post) => post.get({plain:true}));

  res.render('homepage', {
    
  });
});

router.get('/login', (req, res) => {
  // Render the login page
  res.render('login');
});

router.get('/signup', (req, res) => {
  // Render the signup page
  res.render('signup');
});

module.exports = router;
