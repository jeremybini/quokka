var _ = require('lodash'),
		app = require('../../app'),
		mongoose = require('mongoose'),
		router = require('express').Router({ mergeParams: true }),
		module.exports = router,
		Review = mongoose.model('Review');

router.param('id', function(req, res, next) {
	Review.findById(req.params.id)
	.then(review => {
		req.review = review;
	})
	.then(null, next);
});

router.get('/', function(req, res, next) {
	Review.find()
	.then(reviews => {
		res.json(reviews)
	})
	.then(null, next);
})

router.post('/', function(req, res, next) {
	Review.create(req.body)
	.then(review => {
		res.status(201);
		res.json(review);
	})
	.then(null, next);
})

router.get('/:id', function(req, res, next) {
	res.json(req.review);
})

router.put('/:id', function(req, res, next) {
	_.assign(req.review, req.body);

	req.review.save()
	.then(function(review){
		res.json(review);
	})
	.then(null, next);
})

router.delete('/:id', function(req, res, next) {
	req.review.remove()
	.then(function() {
		res.sendStatus(204);
	})
	.then(null, next);
})
