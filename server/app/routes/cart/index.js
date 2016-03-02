'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var User = mongoose.model('User');

router.get('/add', function(req, res, next) {
	if (req.user) {

	} else {

	}
});

router.get('/remove', function(req, res, next) {

});

router.get('/update', function(req, res, next) {

});