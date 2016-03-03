'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

//possible nested router => category

router.param('id', function(req, res, next, id) {
	Product.findById(id)
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

router.get('/', function(req, res, next) {
	//might be a better way to query for categories
	//must pass in categories as query, not category.
	Product.find(req.query)
	.then(products => {
		res.json(products)
	})
	.then(null, next);
})

router.post('/', function(req, res, next) {
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

router.put('/:id', function(req, res, next) {
	_.extend(req.product, req.body);

	req.product.save()
	.then(function(product){
		res.json(product);
	})
	.then(null, next);
})

router.delete('/:id', function(req, res, next) {
	//should also delete all reviews associated with this product
	req.product.remove()
	.then(function() {
		res.sendStatus(204);
	})
	.then(null, next);
})