/* USER ROUTES */
'use strict';
var router = require('express').Router();
var _ = require('lodash');
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var OrderRouter = require('./order');
var ReviewRouter = require('./review');

router.param('id', function(req, res, next, id) {
  User.findById(id)
  .then(user => {
    req.currentUser = user;
    next();
  })
  .then(null, function(err) {
    err.status = 404;
    next(err);
  });
});

//get all users
router.get('/', function(req, res, next) {
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
router.get('/:id', function(req, res, next) {
  res.json(req.currentUser);
});

//add user
router.post('/', function(req, res, next) {
  User.create(req.body).then(null, next);
});

//update user
router.put('/:id', function(req, res, next) {
  _.extend(req.currentUser, req.body);

  req.currentUser.save()
  .then(function(product){
    res.json(product);
  })
  .then(null, next);
  
  // User.findById({_id: req.params.id})
  // .then(function(user) {
  //   user.update(req.body);
  //   user.save();
  // })
  // .then(function(updatedUser) {
  //   res.send(updatedUser);
  // })
  // .then(null, next);
});

//delete user
router.delete('/:id', function(req, res, next) {
  req.currentUser.remove()
  .then(function() {
    res.sendStatus(204);
  })
  .then(null, next);
});