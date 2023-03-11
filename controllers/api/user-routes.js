const router = require('express').Router();
const { User, post } = require('../../models');

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

router.post('/', async(req, res) => {
  // create a new category
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }});

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



module.exports = router;
