'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var User = mongoose.model('User');
var _ = require('lodash');

//this gets run whenever user adds or updates a cart, or is a new user and needs a new cart
router.use(function(req, res, next) {
  var params = {
    status: 'Cart'
  };
  if (req.user) {
    (params.user = req.user._id);
  } else {
    (params.session = req.sessionID);
  }
  Order.findOrCreate(params)
  .then(function(order) {
    req.cart = order;
  })
  .then(null, next);
});

//req.body should have a product ID
router.get('/remove', function(req, res, next) {
  req.cart.products = req.cart.products.filter(function(item) {
    return item.product !== req.body.productId;
  });
  req.cart.save()
  .then(function(result) {
    res.status(204).json(result);
  })
  .then(null, next);
});
//req.body should have a product ID
router.get('/add', function(req, res, next) {
  req.cart.products.push(req.body.productId);
  req.cart.save()
  .then(function(result) {
    res.status(204).json(result);
  })
  .then(null, next);
});
//req.body should have a product ID, updated quantity
router.get('/update', function(req, res, next) {
  var changingProduct = _.find(req.cart.products, {product: req.body.productId});
  changingProduct.quantity = req.body.quantity;
  req.cart.save()
  .then(function(result) {
    res.status(204).json(result);
  })
  .then(null, next);
});

