'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');
var Product = mongoose.model('Product');
var Promotion = mongoose.model('Promotion');
var moment = require('moment');

var OrderSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    price: {
      type: Number
    },
  }],
  promotion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotion'
  },
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
  },
  shippingAddress: {
    type: String
  }, 
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

OrderSchema.virtual('readableDate')
.get(function() {
  return moment(this.dateSubmitted).format("M/D/YYYY");
});

OrderSchema.statics.submitOrder = function(orderId) {
  var submittedOrder;
  var updatedProducts = [];

  //having issues populating an instance, so made this a static instead
  return this.findById(orderId)
      .populate('products.product promotion')
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
        if (order.promotion) {
          return order.applyPromotion(order.promotion);
        }

        return order;
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

//write email function to send email when the status is updated to submitted, shipped, and delivered... shipped and delivered are not status options we have though lololol

OrderSchema.methods.addProduct = function(productId, quantity) {
  var order = this;
  if (productId) {
    var existingProduct;
    order.products.forEach(function(item) {
      if (item.product.equals(productId)) { existingProduct = item }
    });

    if (existingProduct) {
      existingProduct.quantity += +quantity;
    } else {
      order.products.push({
        product: productId,
        quantity: quantity
      });
    }
    return order.save();
  }
};

OrderSchema.methods.removeProduct = function(productId) {
  var order = this;
  
  order.products = order.products.filter(function(item) {
    if (item.product.equals(productId)) {
      item.quantity = 0;
      return false;
    }
    return true;
  });

  return order.save();
};


OrderSchema.methods.updateQuantity = function(productId, quantity) {
  var order = this;

  if (order.products.length) {
    order.products.forEach(function(item) {
      if (item.product.equals(productId)) {
        item.quantity += quantity;
      }
    });
  } else {
    order.products.push({
      product: productId,
      quantity: quantity
    });
  }

  return order.save();
};

function applyDiscount(item, discount) {
  item.price = item.product.price - item.product.price*discount/100;
};

OrderSchema.methods.applyPromotion = function(promotionCode) {
  var order = this;

  return Promotion.findOne({ code: promotionCode })
  .then(function(code) {
    //if that is a valid promo code and it has not expired
    if (code && code.expirationDate > Date.now()) {
      if (code.parameters) {
        var promoProduct = code.parameters.product;
        var promoCategory = code.parameters.category;
      }
      //set current order's promotion to the returned promotion
      order.promotion = code._id;

      //check each product for promo code parameters and apply discount, apply to all if no params
      order.products.forEach(function(item) {
        //reset all prices to original
        item.price = null;
        if(!promoProduct && !promoCategory) {
          applyDiscount(item, code.discount);
        } else {
          if (promoProduct) {
            if (item.product.equals(promoProduct)) {
              applyDiscount(item, code.discount);
            }
          } else {
            if (item.product.categories.indexOf(promoCategory) !== -1) {
              applyDiscount(item, code.discount);
            }
          }
        }
      });
      return order.save();
    } else {
      throw new Error("That's not a valid promotion code");
    }
  })
  .then(order => {
    return order.populate('promotion').execPopulate();
  });
};

OrderSchema.methods.removePromotion = function() {
  this.promotion = null;
  this.products.forEach(function(item) {
    item.price = null;
  });
  return this.save();
};

OrderSchema.virtual('totalPrice').get(function() {
  var total = 0;
  this.products.reduce(function(total, item) {
    total + item.price || item.product.price;
  });
  return total;
});

OrderSchema.statics.findOrCreate = function(params) {
  var order = this;
  return order.findOne(params)
  .populate('products.product promotion')
  .then(function(result) {
    if (result) {
      return result;
    } else {
      return order.create(params);
    }
  })
  .catch(function(err) {
    console.error(err);
  });
};

OrderSchema.pre('validate', function(next) {
  if (this.user || this.session) {
    next();
  } else {
    next(new Error('Either User or Session must be specified.'));
  }
});

OrderSchema.pre('save', function(next) {
  this.products = this.products.filter(function(product) {
    return product.quantity > 0;
  });
  next();
});

mongoose.model('Order', OrderSchema);
