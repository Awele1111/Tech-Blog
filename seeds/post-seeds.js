const { Post } = require('../models');

const postData =[
    {
        title: "cool post",
        body: "This is a cool post!",
        userid:1
    },
    {
        title: "Great post",
        body: "This is a very great post!",
        userid:2
    },
    {
        title: "Lovely post",
        body: "This is a lovely post!, I really like it",
        userid:1
    },
   

   



]
const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;

    
