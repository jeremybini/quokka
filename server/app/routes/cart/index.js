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
  .populate('products')
  .then(function(order) {
    req.cart = order;
    console.log('into then of cart route, cart: ', req.cart)
    next();
  })
  .then(null, function(err) {
    console.log(err);
    next(err);
  });
});

//req.body should have a product ID
router.post('/remove', function(req, res, next) {
  req.cart.removeProduct(req.body.productId)
  .then(function(result) {
    res.status = 204;
    res.json(result);
  })
  .then(null, next);
});

//req.body should have a product ID
router.post('/add', function(req, res, next) {
  req.cart.addProduct(req.body.productId, req.body.quantity)
  .then(function(result) {
    //res.status(204);
    res.json(result);
  })
  .then(null, next);
});

//req.body should have a product ID, updated quantity
router.post('/update', function(req, res, next) {
  req.cart.updateQuantity(req.body.productId, req.body.quantity)
  .then(function(result) {
    res.status = 204;
    res.json(result);
  })
  .then(null, next);
});

//at this time, confirmation email should be sent and other actions probably triggered
router.post('/submit', function(req, res, next) {
  req.cart.submitOrder()
  .then(function(result) {
    res.status = 204;
    res.json(result);
  })
  .then(null, next);
});

router.get('/empty', function(req, res, next) {
  req.cart.products = [];
  req.cart.save()
  .then(function(result) {
    res.status = 204;
    res.json(result);
  })
  .then(null, next);
});

