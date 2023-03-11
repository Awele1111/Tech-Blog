const { User } = require('../models');

const userData =[
    {
        username: "Jane A",
        password: "p@ssword1"
    },
    {
        username: "James A",
        password: "p@ssword2"
    },
    {
        username: "David A",
        password: "p@ssword3"
    }
]
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
