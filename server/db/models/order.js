'use strict';
var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      require: true,
      default: 1
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
    enum: ['Cart', 'Submitted', 'Processing', 'Completed', 'Cancelled'],
    default: 'Cart',
    require: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateSubmitted: {
    type: Date
  },
  dateFulfilled: {
    type: Date
  }
});

OrderSchema.methods.createOrder = function() {
  return Order.findById(this._id).populate('products.product')
      .then(function(order) {
        order.products.forEach(function(item) {
          item.price = item.product.price;
        });
        order.status = 'Created';
        order.dateSubmitted = Date.now();
        return order.save();
      })
};

OrderSchema.methods.updateStatus = function(status) {
  this.status = status;
  return this.save();
};

//will break if order.products.product has not been populated and order status is 'Cart'
OrderSchema.virtual('totalPrice').get(function() {
  var total = 0;
  this.products.forEach(function(item) {
    total += item.price || item.product.price;
  });
  return total;
});

mongoose.model('Order', OrderSchema);
