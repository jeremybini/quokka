'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number
    },
    price: {
      type: Number
    }
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  status: {
    type: String,
    default: 'Cart'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

schema.methods.createOrder = function() {
  return Order.findById(this._id).populate('products.product')
      .then(function(order) {
        order.products.forEach(function(item) {
          item.price = item.product.price;
        });
        order.status = 'Created';
        return order.save();
      })
};

schema.methods.updateStatus = function(status) {
  this.status = status;
  return this.save();
};

//will break if order.products.product has not been populated and order status is 'Cart'
schema.virtual('totalPrice').get(function() {
  var total = 0;
  this.products.forEach(function(item) {
    total += item.price || item.product.price;
  });
  return total;
});

mongoose.model('Order', schema);
