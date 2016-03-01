'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

//possible nested router => category

router.param('id', function(req, res, next, id) {
	Product.findById(id)
	.then(product => {
		console.log("PRODUCT IN ROUTER", product)
		req.product = product;
		next();
	})
	.then(null, next);
});

router.get('/', function(req, res, next) {
	//THINK ABOUT HOW TO QUERY FOR CATEGORIES
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
	_.assign(req.product, req.body);

	req.product.save()
	.then(function(product){
		res.json(product);
	})
	.then(null, next);
})

router.delete('/:id', function(req, res, next) {
	req.product.remove()
	.then(function() {
		res.sendStatus(204);
	})
	.then(null, next);
})