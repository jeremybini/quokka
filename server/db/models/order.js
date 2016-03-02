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
      required: true,
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
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  session: {
    type: String
  },
  dateSubmitted: {
    type: Date
  },
  dateFulfilled: {
    type: Date
  }
});

OrderSchema.methods.submitOrder = function() {
  return this.findById(this._id).populate('products.product')
      .then(function(order) {
        order.products.forEach(function(item) {
          item.price = item.product.price;
        });
        order.status = 'Created';
        order.dateSubmitted = Date.now();
        return order.save();
      });
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

OrderSchema.statics.findOrCreate = function(params) {
  var order = this;
  order.find(params)
  .then(function(result) {
    if (result.length) {
      return result[0];
    } else {
      return order.create(params);
    }
  });
};

OrderSchema.pre('validate', function(next) {
  if (this.user || this.session) {
    next();
  } else {
    next(Error('Either User or Session must be specified.'));
  }
});

OrderSchema.pre('save', function(next) {
  this.products = this.products.filter(function(product) {
    return product.quantity > 0;
  });
});

mongoose.model('Order', OrderSchema);
