/* PRODUCTS - REVIEWS routes */


var _ = require('lodash'),
    mongoose = require('mongoose'),
    router = require('express').Router(),
    Review = mongoose.model('Review'),
    Product = mongoose.model('Product');

module.exports = router;

router.param('reviewId', function(req, res, next, id) {

  Review.findById(id)
  .then(review => {
    if (review) {
      req.review = review;
      next();
    } else {
      next(Error("Uhoh, that review doesn't exist"));
    }
  })
  .then(null,  function(err) {
    err.status = 404;
    next(err);
  });
});

//get all reviews for current user
router.get('/', function(req, res, next) {
  Review.find({
    product: req.product._id
  })
  .then(reviews => {
    res.json(reviews)
  })
  .then(null, next);
})

//create review for current user
router.post('/', function(req, res, next) {
  Review.create(req.body)
  .then(function(review) {
    return Product.addReview(review)
  })
  .then(product => {
    res.status(201);
    res.json(product);
  })
  .then(null, next);
})

//
router.get('/:reviewId', function(req, res, next) {
  res.json(req.review);
});

//
router.put('/:reviewId', function(req, res, next) {
  _.extend(req.review, req.body);

  req.review.save()
  .then(function(review){
    res.json(review);
  })
  .then(null, next);
});

//
router.delete('/:reviewId', function(req, res, next) {
  req.review.remove()
  .then(function(review) {
    return Product.removeReview(review);
  })
  .then(function(product) {
    res.status = 204;
    res.json(product);
  })
  .then(null, next);
})
