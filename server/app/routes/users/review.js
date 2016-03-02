var _ = require('lodash'),
		mongoose = require('mongoose'),
		router = require('express').Router({ mergeParams: true }),
		Review = mongoose.model('Review');

module.exports = router;

router.param('id', function(req, res, next) {
	Review.findById(req.params.id)
	.then(review => {
		req.review = review;
		next();
	})
	.then(null,  function(err) {
		err.status = 404;
		next(err);
	});
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
	_.extend(req.review, req.body);

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
