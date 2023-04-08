const { Comment } = require("../models");
const faker = require("faker");

const commentData = [];

for (let i = 0; i < 20; i++) {
    // create a randomly generated paragraph 300 words or less
    const comment_text = faker.lorem.words(Math.floor(Math.random() * 300) + 1);
    // pick one of the 20 randomly generated posts
    const post_id = Math.floor(Math.random() * 20) + 1;
    // pick one of the 10 randomly generated users
    const user_id = Math.floor(Math.random() * 10) + 1;

    commentData.push({ comment_text, post_id, user_id });
};

// function that seeds comment data
const seedComments = () => Comment.bulkCreate(commentData);

// exports 
module.exports = seedComments;