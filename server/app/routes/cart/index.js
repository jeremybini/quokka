'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var User = mongoose.model('User');
var _ = require('lodash');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://attempt101c@gmail.com:quokka123@smtp.gmail.com');

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
    next();
  })
  .then(null, function(err) {
    console.log(err);
    next(err);
  });
});

router.get('/apply-promo/:code', function(req, res, next) {
  req.cart.applyPromotion(req.params.code)
  .then(function(newOrderPrice) {
    res.json(newOrderPrice);
  })
  .then(null, next);
});

//get the order that is cart status
router.get('/', function(req, res, next) {
  res.json(req.cart);
});

router.delete('/apply-promo', function(req, res, next) {
  req.cart.removePromotion()
  .then(function(order) {
    res.json(order);
  })
  .then(null, next);
});

//req.body should have a product ID
router.delete('/:id', function(req, res, next) {
  req.cart.removeProduct(req.params.id)
  .then(function(result) {
    res.status(200);
    res.json(result);
  })
  .then(null, next);
});

//req.body should have a product ID
router.post('/', function(req, res, next) {
  req.cart.addProduct(req.body.productId, req.body.quantity)
  .then(function(result) {
    res.status(201);
    res.json(result);
  })
  .then(null, next);
});

//req.body should have a product ID, updated quantity
router.put('/', function(req, res, next) {
  req.cart.updateQuantity(req.body.productId, req.body.quantity)
  .then(function(result) {
    res.status(200);
    res.json(result);
  })
  .then(null, next);
});

//at this time, confirmation email should be sent and other actions probably triggered
router.get('/submit', function(req, res, next) {
  Order.submitOrder(req.cart._id)
  .then(function(result) {
    if (req.user) {
      var mailOptions = {
        from: "StackStore <stackstore@stackstore.com>",
        to: req.user.email,
        subject: 'Order ' + result.status,
        text: "Your order's status is now " + result.status + ".",
        html: "Your order's status is now " + result.status + "."
      };
      transporter.sendMail(mailOptions);
    }
    res.status(200);
    res.json(result);
  })
  .then(null, next);
});

router.delete('/', function(req, res, next) {
  req.cart.products = [];
  req.cart.save()
  .then(function(result) {
    res.json(result);
  })
  .then(null, next);
});

