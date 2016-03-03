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
    console.log('into then of cart route, cart: ', req.cart)
    next();
  })
  .then(null, function(err) {
    console.log(err);
    next(err);
  });
});

//what happens when unauth users add to carts then leave? we will
//have lots of carts in the database that should be removed

//req.body should have a product ID
router.post('/remove', function(req, res, next) {
  req.cart.products = req.cart.products.filter(function(item) {
    return item.product !== req.body.productId;
  });
  req.cart.save()
  .then(function(result) {
    res.status = 204;
    res.json(result);
  })
  .then(null, next);
});

//req.body should have a product ID
router.post('/add', function(req, res, next) {
  var existingProduct = _.find(req.cart.products, {product: req.body.productId});
  console.log("Made it to post add route, cart: ", req.body);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    req.cart.products.push({product: req.body.productId});
    console.log('!!!!!!!', req.cart.products);
  }
  req.cart.save()
  .then(function(result) {
    console.log('!?!?!?!', result);
    //res.status(204);
    res.json(result);
  })
  .then(null, next);
});

//req.body should have a product ID, updated quantity
router.post('/update', function(req, res, next) {
  var changingProduct = _.find(req.cart.products, {product: req.body.productId});
  changingProduct.quantity = req.body.quantity;

  req.cart.save()
  .then(function(result) {
    res.status = 204;
    res.json(result);
  })
  .then(null, next);
});

//req.body should have a product ID, updated status--this is where orders
//are actually submitted
//at this time, confirmation email should be sent and other actions probably triggered
router.post('/submit', function(req, res, next) {
  req.cart.status = "Submitted";
  req.cart.save()
  .then(function(result) {
    res.status = 204;
    res.json(result);
  })
  .then(null, next);
});

