/* USER ROUTES */

'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Users = mongoose.model('User');

//get all users
router.get('/', function(req, res, next) {
  Users.find({}).exec()
  .then(function(allUsers) {
    res.send(allUsers);
  })
  .then(null, next);
});

//get user by ID
router.get('/:id', function(req, res, next) {
  Users.findById({_id: req.params.id})
  .then(function(user) {
    res.send(user);
  })
  .then(null, next);
});

//add user
router.post('/', function(req, res, next) {
  Users.create(req.body).then(null, next);
});

//update user
router.put('/:id', function(req, res, next) {
  Users.findById({_id: req.params.id})
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
router.delete('/:id', function(req, res, next) {
  Users.findOneAndRemove({_id: req.params.id})
  .then(function() {
    res.sendStatus(204);
  })
  .then(null, next);
});