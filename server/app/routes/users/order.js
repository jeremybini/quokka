var _ = require('lodash'),
		app = require('../../app'),
		mongoose = require('mongoose'),
		router = require('express').Router({ mergeParams: true }),
		module.exports = router,
		Order = mongoose.model('Order');

router.param('id', function(req, res, next) {
	Order.findById(req.params.id)
	.then(order => {
		req.order = order;
	})
	.then(null, next);
});

router.get('/', function(req, res, next) {
	Order.find()
	.then(orders => {
		res.json(orders)
	})
	.then(null, next);
})

router.post('/', function(req, res, next) {
	Order.create(req.body)
	.then(order => {
		res.status(201);
		res.json(order);
	})
	.then(null, next);
})

router.get('/:id', function(req, res, next) {
	res.json(req.order);
})

router.put('/:id', function(req, res, next) {
	_.assign(req.order, req.body);

	req.order.save()
	.then(function(order){
		res.json(order);
	})
	.then(null, next);
})

router.delete('/:id', function(req, res, next) {
	req.order.remove()
	.then(function() {
		res.sendStatus(204);
	})
	.then(null, next);
})
