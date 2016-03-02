/* PRODUCT MODEL */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  photoUrl: {
    required: true,
    type: String
  }
});

ProductSchema.statics.addReview = function(review) {
  return this.findById(review.product)
  .then(function(product) {
    product.reviews.addToSet(review._id);
    return product.save();
  });
};

ProductSchema.statics.removeReview = function(review) {
  return this.findOne({ reviews: review._id })
  .then(function(product) {
    product.reviews.pull(review);
    return product.save()
  });
};

mongoose.model('Product', ProductSchema);
