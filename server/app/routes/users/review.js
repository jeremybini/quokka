//FOR ALL ROUTES HERE, require req.user._id === req.requestedUser || req.user.isAdmin

var _ = require('lodash'),
		auth = require('../authentication'),
		mongoose = require('mongoose'),
		router = require('express').Router({ mergeParams: true }),
		Review = mongoose.model('Review');

module.exports = router;

router.use(auth.ensureCurrentUserOrAdmin);

router.param('reviewId', function(req, res, next, id) {
	Review.findById(id)
	.then(review => {
		req.review = review;
		next();
	})
	.then(null,  function(err) {
		err.status = 404;
		next(err);
	});
});

//get all reviews for current user
router.get('/', function(req, res, next) {
	Review.find({
		user: req.currentUser._id
	})
	.then(reviews => {
		res.json(reviews)
	})
	.then(null, next);
})

//create review for current user
//do we need this?
router.post('/', function(req, res, next) {
	req.user.addReview(req.body)
	.then(review => {
		res.status(201);
		res.json(review);
	})
	.then(null, next);
})

//
router.get('/:reviewId', function(req, res, next) {
	res.json(req.review);
})

//
router.put('/:reviewId', function(req, res, next) {
	_.extend(req.review, req.body);

	req.review.save()
	.then(function(review){
		res.json(review);
	})
	.then(null, next);
})

//
router.delete('/:reviewId', function(req, res, next) {
	req.user.removeReview(req.review)
	.then(function() {
		res.sendStatus(204);
	})
	.then(null, next);
})
