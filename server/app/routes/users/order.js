//FOR ALL ROUTES HERE, require req.user._id === req.requestedUser || req.user.isAdmin

var _ = require('lodash'),
		mongoose = require('mongoose'),
		router = require('express').Router({ mergeParams: true }),
		Order = mongoose.model('Order');

module.exports = router;

router.param('id', function(req, res, next) {
	Order.findById(req.params.id)
	.then(order => {
		req.order = order;
		next();
	})
	.then(null, function(err) {
		err.status = 404;
		next(err);
	});
});

router.get('/', function(req, res, next) {
	Order.find({
		user: req.user._id;
	})
	.then(orders => {
		res.json(orders)
		next();
	})
	.then(null, next);
})

router.post('/', function(req, res, next) {
	//also need to add order to user's document
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
	_.extend(req.order, req.body);

	req.order.save()
	.then(function(order){
		res.json(order);
	})
	.then(null, next);
})

router.delete('/:id', function(req, res, next) {
	//also need to remove from user doc
	req.order.remove()
	.then(function() {
		res.sendStatus(204);
	})
	.then(null, next);
})
