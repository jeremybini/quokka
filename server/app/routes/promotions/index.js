/* PROMOTIONS ROUTES */
'use strict';
var router = require('express').Router();
module.exports = router;

var _ = require('lodash');
var auth = require('../authentication');

var mongoose = require('mongoose');
var Promotion = mongoose.model('Promotion');

//get all promotions
router.get('/', function(req, res, next) {
  Promotion.find({})
  .populate('parameters.product parameters.category')
  .then(function(promotions) {
    res.send(promotions);
  })
  .then(null, next);
});

//get one promotion
router.get('/:id', function(req, res, next) {
  Promotion.findById({id: req.params.id})
  .populate('parameters')
  .then(function(promotion) {
    res.send(promotion);
  })
  .then(null, next);
});

//add a promotion
router.post('/', auth.ensureAdmin, function(req, res, next) {
  Promotion.create(req.body)
  .then(function(newPromotion) {
    res.status(201);
    res.send(newPromotion);
  })
  .then(null, next);
});

//update promotion
router.put('/:id', auth.ensureAdmin, function(req, res, next) {
  Promotion.findById({id: req.params.id})
  .then(function(promotion) {
    _.merge(promotion, req.body);
  })
  .then(function(updatedPromotion) {
    res.send(updatedPromotion);
  })
  .then(null, next);
});

//delete promotion
router.delete('/:id', auth.ensureAdmin, function(req, res, next) {
  Promotion.findOneAndRemove({_id: req.params.id})
  .then(function() {
    res.sendStatus(204);
  })
  .then(null, next);
});
