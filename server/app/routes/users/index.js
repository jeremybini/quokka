/* USER ROUTES */

'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//get all User
router.get('/user', function(req, res, next) {
  User.find({}).exec()
  .then(function(allUser) {
    res.send(allUser);
  })
  .then(null, next);
});

//get user by ID
router.get('/user/:id', function(req, res, next) {
  User.findById({_id: req.params.id})
  .then(function(user) {
    res.send(user);
  })
  .then(null, next);
});

//add user
router.post('/user', function(req, res, next) {
  User.create(req.body).then(null, next);
});

//update user
router.put('/user/:id', function(req, res, next) {
  User.findById({_id: req.params.id})
  .then(function(user) {
    user.update(req.body);
    user.save();
  })
  .then(function(updatedUser) {
    res.send(updatedUser);
  })
  .then(null, next);
});

//delete user
router.delete('/user/:id', function(req, res, next) {
  User.findOneAndRemove({_id: req.params.id})
  .then(function() {
    res.sendStatus(204);
  })
  .then(null, next);
});