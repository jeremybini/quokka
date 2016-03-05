/* PRODUCT MODEL */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Review = mongoose.model('Review');


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
  },
  stock: {
    type: Number,
    min: 0
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
  return this.findById(review.product)
  .then(function(product) {
    product.reviews.pull(review);
    return product.save();
  });
};

ProductSchema.statics.updateStock = function(productId, quantity) {
  return this.findById(productId)
  .then(function(product) {
    if(product.stock < quantity) {
      return Error('Not enough product in stock to fulfill order!');
    } else {
      product.stock -= quantity;
      return product.save();
    }
  });
};



//THIS THROWS AN ERROR SAYING MONGOOSE MODEL 'REVIEW' HASNT BEEN REGISTERED, CANT FIGURE OUT WHY
// ProductSchema.post('remove', function(productId){
//   return Review.removeReviewsForProduct(productId);
// })

mongoose.model('Product', ProductSchema);
