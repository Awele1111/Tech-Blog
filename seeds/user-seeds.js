// const { User } = require('../models');

// const userData =[
//     {
//         username: "Jane A",
//         password: "p@ssword1"
//     },
//     {
//         username: "James A",
//         password: "p@ssword2"
//     },
//     {
//         username: "David A",
//         password: "p@ssword3"
//     }
// ]
// const seedUser = () => User.bulkCreate(userData);

// module.exports = seedUser;

// const path = require('path');
// const faker = require(path.resolve(__dirname, '..', 'node_modules', 'faker'));
// // const faker = require('faker');

// const { User } = require("../models");
// // const faker = require("faker");
// // const faker = require('./node_modules/faker');

// // const path = require('path');


// const userData = [];

// for (let i = 0; i < 10; i++) {
//     const username = faker.internet.userName();
//     const email = faker.internet.email(username);
//     const password = faker.internet.password();

//     userData.push({ username, email, password });
// };

// // function that seeds user data
// const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

// // exports 
// module.exports = seedUsers;

const { User } = require("../models");
const faker = require("faker");

const userData = [];

for (let i = 0; i < 10; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
};

// function that seeds user data
const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

// exports 
module.exports = seedUsers;
