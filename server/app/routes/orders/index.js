/* ADMIN ONLY - ORDERS ROUTES */
'use strict';
var router = require('express').Router();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://attempt101c@gmail.com:quokka123@smtp.gmail.com');
var fs = require('fs');

module.exports = router;

var auth = require('../authentication');

var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var User = mongoose.model('User');

//get order by ID
router.get('/:id', function(req, res, next) {
  Order.findById({_id: req.params.id})
  .populate('products.product')
  .then(function(order) {
    if (auth.isCurrentUserOrAdmin(req.user, order.user)) {
      res.send(order);
    } else {
      next(new Error('You Shall Not Pass.'))
    }
  })
  .then(null, next);
});

//ADMIN ONLY ROUTES
router.use(auth.ensureAdmin);

//get all orders of all users
router.get('/', function(req, res, next) {
  Order.find({})
  .populate('products.product')
  .then(function(orders) {
    res.send(orders);
  })
  .then(null, next);
});

//delete order
router.delete('/:id', function(req, res, next) {
  Order.findOneAndRemove({_id: req.params.id})
  .then(function() {
    res.sendStatus(204);
  })
  .then(null, next);
});

//update order status CART to SUBMITTED, using createOrder
//update order status after order has been submitted (SUBMITTED-PROGRESS, PROGRESS-COMPLETE/CANCEL), using updateStatus
router.put('/:id', function(req, res, next) {
  Order.findById({_id: req.params.id})
  .populate('user')
  .then(function(order) {
    if (order.status === 'Cart') {
      return order.submitOrder();
    } else {
      return order.updateStatus(req.body.status);
    }
  })
  .then(function(updatedOrder) {
    if (req.body.status === 'Submitted' || req.body.status === 'Completed') {
      var mailOptions = {
        from: "StackStore <stackstore@stackstore.com>",
        to: updatedOrder.user.email,
        subject: 'Order ' + req.body.status,
        text: "Your order's status is now: " + req.body.status + ".",
        html: "Your order's status is now: " + req.body.status + "."
      };
      transporter.sendMail(mailOptions);
    }
    res.send(updatedOrder);
  })
  .then(null, next);
});

