const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET /api/posts (get all posts)
router.get("/", (req, res) => {
    console.log("==========================");
    Post.findAll({
        order: [["created_at", "DESC"]],
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
                }
            },
            {
                model: User,
                attributes: ["username"],
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        res.status(500).json(err);
    });
});

// GET /api/posts/:id (get one post by id)
router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
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
                }
            },
            {
                model: User,
                attributes: ["username"],
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({
                message: "No post found with this id!"
            });
            return;
        };
        res.json(dbPostData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// POST /api/posts (create a new post, only if logged in)
router.post("/", withAuth, (req, res) => {
    Post.create({
        title: req.body.title, 
        body: req.body.body,
        user_id: req.session.user_id,
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        res.status(500).json(err);
    });
});

// PUT /api/posts (edit a post by id, only if logged in)
router.put("/:id", withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            body: req.body.body,
        }, 
        {
            where: {
                id: req.params.id,
            },
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({
                message: "No post found with this id!"
            });
            return;
        };
        res.json(dbPostData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// DELETE /api/posts/:id (delete a post by id, only if logged in)
router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({
                message: "No post found with this id!"
            });
            return;
        };
        res.json(dbPostData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// exports
module.exports = router;
