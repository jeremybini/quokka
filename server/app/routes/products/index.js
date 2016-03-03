'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var ReviewRouter = require('./review');

//possible nested router => category

router.param('id', function(req, res, next, id) {
	var params = { _id: id }
	//if (notAdmin) {
	//	params.stock = { $gt: 0 }	
	//}
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
	//if (notAdmin) {
	//	req.query.stock = { $gt: 0 }	
	//}
	Product.find(req.query)
	.then(products => {
		res.json(products)
	})
	.then(null, next);
})

//admin only
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

//admin only
router.put('/:id', function(req, res, next) {
	_.extend(req.product, req.body);

	req.product.save()
	.then(function(product){
		res.json(product);
	})
	.then(null, next);
})

//admin only
router.delete('/:id', function(req, res, next) {
	//should also delete all reviews associated with this product
	req.product.remove()
	.then(function() {
		res.sendStatus(204);
	})
	.then(null, next);
})