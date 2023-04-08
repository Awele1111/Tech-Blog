// const router = require('express').Router();
// const apiRoutes = require('./api');
// const apiRoutes = require('./api/index');

// const homeRoutes = require('./api/homeRoutes');

// router.use('/', homeRoutes);
// router.use('/api', apiRoutes);

// module.exports = router;


// const router = require('express').Router();
// const userRoutes = require('./api/userRoutes');
// const dashboardRoutes = require('./api/dashboardRoutes');
// const postRoutes = require('./api/postRoutes');

// router.use('/api/users', userRoutes);
// router.use('/api/dashboard', dashboardRoutes);
// router.use('/api/posts', postRoutes);

// module.exports = router;

const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;


