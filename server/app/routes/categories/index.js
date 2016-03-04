/* CATEGORY ROUTES */
'use strict';
var router = require('express').Router();
module.exports = router;

var _ = require('lodash');
var auth = require('../authentication');

var mongoose = require('mongoose');
var Category = mongoose.model('Category');

//get all categories
router.get('/', function(req, res, next) {
  Category.find({})
  .then(function(categories) {
    res.send(categories);
  })
  .then(null, next);
});

//get one category
router.get('/:id', function(req, res, next) {
  Category.findById({id: req.params.id})
  .then(function(category) {
    res.send(category);
  })
  .then(null, next);
});

//add a category
router.post('/', auth.ensureAdmin, function(req, res, next) {
  Category.create(req.body)
  .then(function(newCategory) {
    res.status(201);
    res.send(newCategory);
  })
  .then(null, next);
});

//update category
router.put('/:id', auth.ensureAdmin, function(req, res, next) {
  Category.findById({id: req.params.id})
  .then(function(category) {
    category.name = req.body.name;
  })
  .then(function(updatedCategory) {
    res.send(updatedCategory);
  })
  .then(null, next);
});

//delete category
router.delete('/:id', auth.ensureAdmin, function(req, res, next) {
  Category.findOneAndRemove({_id: req.params.id})
  .then(function() {
    res.sendStatus(204);
  })
  .then(null, next);
});
