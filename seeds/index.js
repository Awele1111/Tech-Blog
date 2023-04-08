// const seedUser = require('./user-seeds');
// // const seedComment = require('./comment-seeds');
// const seedPost = require('./post-seeds');

// const sequelize = require('../config/config.js');

// const seedAll = async () => {
//   await sequelize.sync({ force: true });
//   console.log('\n----- DATABASE SYNCED -----\n');
//   await seedUser();
//   console.log('\n----- USERS SEEDED -----\n');

//   await seedPost();
//   console.log('\n----- POSTS SEEDED -----\n');

//   // await seedComment();
//   // console.log('\n----- COMMENT SEEDED -----\n');



//   process.exit(0);
// };

// seedAll();

const seedUsers = require("./user-seeds");
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
const sequelize = require("../config/connection");

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log("------ DATABASE CONNECTED ------\n");

    await seedUsers();
    console.log("--------- USERS SEEDED ---------\n");

    await seedPosts();
    console.log("--------- POSTS SEEDED ---------\n");

    await seedComments();
    console.log("------- COMMENTS SEEDED --------\n");

    process.exit(0);
};

// function call to seed all parts of database
seedAll();
