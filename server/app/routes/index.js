'use strict';
var router = require('express').Router();
module.exports = router;


//maybe change to admins only?
router.use('/members', require('./members'));
router.use('/user', require('./users'));
// Make sure this is after all of
// the registered routes!





router.use(function (req, res) {
    res.status(404).end();
});
