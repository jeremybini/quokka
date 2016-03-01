'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  rating: {
    type: Number,
    default: null
  },
  content: {
    type: String,
    minlength: 5
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
});

mongoose.model('Review', schema);
