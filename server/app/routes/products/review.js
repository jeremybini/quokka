/* PRODUCTS - REVIEWS routes */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    router = require('express').Router(),
    auth = require('../authentication'),
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

router.get('/', function(req, res, next) {
  Review.find({
    product: req.product._id
  })
  .then(reviews => {
    res.json(reviews)
  })
  .then(null, next);
})

router.post('/', auth.ensureUser, function(req, res, next) {
  Review.create(req.body)
  .then(function(review) {
    return Product.addReview(review)
  })
  .then(product => {
    return Review.find({
      product: req.product._id
    })
  })
  .then(reviews => {
    res.status(201).json(reviews);
  })
  .then(null, next);
})

router.get('/:reviewId', function(req, res, next) {
  res.json(req.review);
});

router.put('/:reviewId', function(req, res, next) {
  if(req.review.user.equals(req.user) || req.user.admin) {
    _.extend(req.review, req.body);

    req.review.save()
    .then(function(review){
      res.json(review);
    })
    .then(null, next);
  } else {
    res.sendStatus(403);
  }
});

router.delete('/:reviewId', function(req, res, next) {
  if(req.review.user.equals(req.user) || req.user.admin) {
    req.review.remove()
    .then(function(review) {
      return Product.removeReview(review);
    })
    .then(function(product) {
      res.status = 204;
      res.json(product);
    })
    .then(null, next);
  } else {
    res.sendStatus(403);
  }
})
