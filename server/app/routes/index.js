'use strict';
var router = require('express').Router();
var auth = require('./authentication');
module.exports = router;

router.use('/members', require('./members'));
router.use('/products', require('./products'));
router.use('/cart', require('./cart'));

router.use('/orders', auth.ensureAdmin, require('./orders'));
router.use('/users', auth.ensureUser, require('./users'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
