// const router = require('express').Router();
// const { User, post } = require('../../models');

// The `/api/categories` endpoint

// router.get('/', async(req, res) => {
//   // find all categories
//   // be sure to include its associated Products
//   try {
//     const userData = await User.findAll();
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/:id', async(req, res) => {
//   // find one category by its `id` value
//   // be sure to include its associated Products
//   try {
//     const userData = await User.findByPk(req.params.id);
//     if (!userData) {
//       res.status(404).json({ message: 'No category with this id!' });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }});

// router.post('/', async(req, res) => {
//   // create a new category
//   try {
//     const userData = await User.create(req.body);
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(400).json(err);
//   }});

// router.put('/:id', async(req, res) => {
//   // update a category by its `id` value
//   try {
//     const userData = await User.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!userData[0]) {
//       res.status(404).json({ message: 'No user with this id!' });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



// module.exports = router;


const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// GET /api/users (get all users)
router.get("/", (req, res) => {
    User.findAll({
        attributes: {
            exclude: ["password"],
        },
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        res.status(500).json(err);
    });
});

// GET /api/users/:id (get one user)
router.get("/:id", (req, res) => {
    User.findOne({
        where: {
            id: req.params.id,
        },
        attributes: {
            exclude: ["password"],
        }, 
        include: [
            {
                model: Post, 
                attributes: [
                    "id", 
                    "title", 
                    "body", 
                    "created_at"
                ]
            }, 
            {
                model: Comment, 
                attributes: [
                    "id", 
                    "comment_text", 
                    "post_id", 
                    "created_at",
                ],
                include: {
                    model: Post, 
                    attributes: ["title"],
                }
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        };
        res.json(dbUserData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// POST /api/users (create a user) (signup)
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, 
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json(userData);
        });
    });
});

// POST /login 
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
        },
    })
    .then(userData => {
        if (!userData) {
            res.status(400).json({ message: "There is no user with that username!" });
            return;
        };

        // verify password matches
        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: "Incorrect password! Try again." });
            return;
        };

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({ 
                user: userData,
                message: "You are now logged in.",
            });
        });
    });
});

// POST /logout
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    };
});

// PUT /api/users/:id (edit one user's data by id)
router.put("/:id", (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        },
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        };
        res.json(dbUserData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// DELETE /api/users/:id (delete one user by id)
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        };
        res.json(dbUserData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// exports
module.exports = router;
