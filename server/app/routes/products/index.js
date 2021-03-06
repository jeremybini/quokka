'use strict';
var router = require('express').Router();
module.exports = router;

var _ = require('lodash');
var auth = require('../authentication');

var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var ReviewRouter = require('./review');

router.get('/featured', function(req, res, next) {
	var limit = +req.query.limit;
	delete req.query.limit
	if (!req.user || !req.user.admin) {
		req.query.stock = { $gt: 0 }
	}
	Product.find(req.query)
	.limit(limit)
	.populate('categories reviews')
	.then(products => {
		res.json(products)
	})
	.then(null, next);
})

router.param('id', function(req, res, next, id) {
	var params = { _id: id }
	if (!req.user || !req.user.admin) {
		params.stock = { $gt: 0 }
	}
	Product.findOne(params)
	.populate('reviews categories')
	.then(product => {
		req.product = product;
		next();
	})
	.then(null, function(err) {
		err.status = 404;
		next(err);
	});
});

router.use('/:id/reviews', ReviewRouter);

router.get('/', function(req, res, next) {
	if (!req.user || !req.user.admin) {
		req.query.stock = { $gt: 0 }
	}
	Product.find(req.query)
	.populate('categories')
	.then(products => {
		res.json(products)
	})
	.then(null, next);
})

router.post('/', auth.ensureAdmin, function(req, res, next) {
	Product.create(req.body)
	.then(product => {
		res.status(201);
		res.json(product);
	})
	.then(null, next);
})

router.get('/:id', function(req, res, next) {
	res.json(req.product);
})

router.put('/:id', auth.ensureAdmin, function(req, res, next) {
	_.merge(req.product, req.body);
  req.product.categories = req.body.categories;

	req.product.save()
	.then(function(product){
		res.json(product);
	})
	.then(null, next);
})

router.delete('/:id', auth.ensureAdmin, function(req, res, next) {
	req.product.remove()
	.then(function() {
		res.sendStatus(204);
	})
	.then(null, next);
})
