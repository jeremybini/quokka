/* ADMIN ONLY - ORDERS ROUTES */

'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var User = mongoose.model('User');

//get all orders of all users
router.get('/', function(req, res, next) {
  Order.find({}).exec()
  .then(function(orders) {
    res.send(orders);
  })
  .then(null, next);
});

//get all orders of one user
router.get('/user/:userId', function(req, res, next) {
  User.findById({_id: req.params.userId}).populate('orders')
  .then(function(ordersOfThisUser) {
    res.send(ordersOfThisUser);
  })
  .then(null, next);
});

//get order by ID
router.get('/:id', function(req, res, next) {
  Order.findById({_id: req.params.id})
  .then(function(order) {
    res.send(order);
  })
  .then(null, next);
});

//update order status CART to SUBMITTED, using createOrder
//update order status after order has been submitted (SUBMITTED-PROGRESS, PROGRESS-COMPLETE/CANCEL), using updateStatus
router.put('/:id', function(req, res, next) {
  Order.findById({_id: req.params.id})
  .then(function(order) {
    if (order.status === 'Cart') {
      order.submitOrder();
    } else {
      order.updateStatus(req.body.status);
    }
  })
  .then(function(updatedOrder) {
    res.send(updatedOrder);
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