/* USER ROUTES */
'use strict';
var router = require('express').Router();
module.exports = router;

var _ = require('lodash'),
    auth = require('../authentication'),

    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    OrderRouter = require('./order'),
    ReviewRouter = require('./review');

router.param('id', function(req, res, next, id) {
  User.findById(id)
  .populate('orders.products reviews')
  .then(user => {
    if (user) {
      req.currentUser = user;
      next();
    } else {
      var err = new Error('Something went wrong.');
      err.status = 404;
      next(err);
    }
  })
  .then(null, next);
});

//get all users
router.get('/', auth.ensureAdmin, function(req, res, next) {
  User.find({}).exec()
  .then(function(allUsers) {
    res.send(allUsers);
  })
  .then(null, next);
});

//nested sub-routers
router.use('/:id/orders/', OrderRouter);
router.use('/:id/reviews/', ReviewRouter);

//get user by ID
router.get('/:id', auth.ensureCurrentUserOrAdmin, function(req, res, next) {
  res.json(req.currentUser);
});

//add user
router.post('/', auth.ensureAdmin, function(req, res, next) {
  User.create(req.body)
  .then(function(user) {
    res.json(user.sanitize());
  })
  .then(null, next);
});

//update user
router.put('/:id', auth.ensureCurrentUserOrAdmin, function(req, res, next) {
  _.merge(req.currentUser, req.body);
  
  if(!req.user.admin) {
    req.currentUser.admin = false;
  }
  req.currentUser.save()
  .then(function(user){
    res.json(user.sanitize());
  })
  .then(null, next);
  
});

//delete user
router.delete('/:id', auth.ensureAdmin, function(req, res, next) {
  req.currentUser.remove()
  .then(function() {
    res.sendStatus(204);
  })
  .then(null, next);
});