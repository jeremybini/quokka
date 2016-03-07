'use strict';
var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    default: null,
    //required: true
  },
  title: {
    type: String,
    minlength: 5,
    maxlength: 50
  },
  content: {
    type: String,
    minlength: 5,
    maxlength: 255
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
});

ReviewSchema.statics.removeReviewsForProduct = function(productId) {
  this.find({ product: productId })
  .then(function(reviews) {
    var removedReviews = [];
    reviews.forEach(function(review) {
      removedReviews.push(review.remove());
    })
    return Promise.all(removedReviews);
  });
}

mongoose.model('Review', ReviewSchema);
