// const router = require('express').Router();
// const userRoutes = require('./userRoutes');
// const postRoutes = require('./postRoutes');
// const dashboardRoutes = require('../dashboardRoutes')

// router.use('/users', userRoutes);
// router.use('/post', postRoutes);
// router.use('/dashboard', dashboardRoutes);


// module.exports = router;

const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

// direct webpage to the appropriate resource
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

// exports
module.exports = router;
