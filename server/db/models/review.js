'use strict';
var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    default: null,
    required: true
  },
  content: {
    type: String,
    minlength: 5,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    //required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
});

mongoose.model('Review', ReviewSchema);
