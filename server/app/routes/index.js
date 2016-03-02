'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/products', require('./products'));
router.use('/cart', require('./cart'));

//should we add authentication check here for /users?
////req.user._id === req.requestedUser || req.user.isAdmin
router.use('/users', require('./users'));
// Make sure this is after all of
// the registered routes!





router.use(function (req, res) {
    res.status(404).end();
});
