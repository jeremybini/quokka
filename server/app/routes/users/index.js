/* USER ROUTES */
'use strict';
var router = require('express').Router();
module.exports = router;

var _ = require('lodash');
var auth = require('../authentication');

var mongoose = require('mongoose');
var User = mongoose.model('User');
var OrderRouter = require('./order');
var ReviewRouter = require('./review');

router.param('id', function(req, res, next, id) {
  User.findById(id)
  .then(user => {
    req.currentUser = user.sanitize();
    next();
  })
  .then(null, function(err) {
    err.status = 404;
    next(err);
  });
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
router.use('/:id/orders/', auth.ensureCurrentUserOrAdmin, OrderRouter);
router.use('/:id/reviews/', auth.ensureCurrentUserOrAdmin, ReviewRouter);

//get user by ID
router.get('/:id', auth.ensureCurrentUserOrAdmin, function(req, res, next) {
  res.json(req.currentUser);
});

//add user
router.post('/', auth.ensureAdmin, function(req, res, next) {
  User.create(req.body).then(null, next);
});

//update user
router.put('/:id', auth.ensureCurrentUserOrAdmin, function(req, res, next) {
  _.extend(req.currentUser, req.body);
  
  if(!req.user.admin) {
    req.currentUser.admin = false;
  }

  req.currentUser.save()
  .then(function(product){
    res.json(product);
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