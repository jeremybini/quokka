'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');
var Product = mongoose.model('Product');

var OrderSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
      // required: true
    },
    quantity: {
      type: Number,
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
    default: 'Cart'
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
  var submittedOrder;
  var updatedProducts = [];

  return this.populate('products.product')
      .then(function(order) {
        order.products.forEach(function(item) {
          item.price = item.product.price;
          var p = Product.updateStock(item.product._id, item.quantity);
          updatedProducts.push(p);
        });

        order.status = 'Submitted';
        order.dateSubmitted = Date.now();
        return order.save();
      })
      .then(function(order) {
        submittedOrder = order;
        return Promise.all(updatedProducts);
      })
      .then(function(){
        return submittedOrder;
      });
};

OrderSchema.methods.updateStatus = function(status) {
  this.status = status;
  return this.save();
};

OrderSchema.methods.addProduct = function(productId, quantity) {
  var order = this;
  var existingProduct = _.find(order.products, {product: productId});

  if (existingProduct) {
    existingProduct.quantity += order.quantity;
  } else {
    order.products.push({
      product: productId,
      quantity: quantity
    });
  }
  return order.save();

};

OrderSchema.methods.removeProduct = function(productId) {
  var order = this;
  
  order.products = order.products.filter(function(item) {
    if (item.product === order.productId) {
      quantity = item.quantity;
      return false;
    }
    return true;
  });

  return order.save();
};

OrderSchema.methods.updateQuantity = function(productId, quantity) {
  var order = this;

  order.products.forEach(function(item) {
    if (item.product === order.productId) {
      item.quantity = quantity;
    }
  });

  return order.save();
};

OrderSchema.virtual('totalPrice').get(function() {
  var total = 0;
  this.products.forEach(function(item) {
    total += item.price || item.product.price;
  });
  return total;
});

OrderSchema.statics.findOrCreate = function(params) {
  var order = this;
  console.log('in findorcreate', order);
  return order.find(params)
  .then(function(result) {
    console.log('in find or create, result: ', result);
    if (result.length) {
      return result[0];
    } else {
      console.log('in order create else: ', params)
      return order.create(params);
    }
  })
  .catch(function(err) {
    console.error(err);
  })
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
  next();
});

mongoose.model('Order', OrderSchema);
