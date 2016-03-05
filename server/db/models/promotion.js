'use strict';
var mongoose = require('mongoose');

var PromotionSchema = new mongoose.Schema({
  title: {
    type: String
  },
  code: {
    type: String
  },
  discount: {
    type: Number,
    required: true
  },
  parameters: {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  expirationDate: Date
});

PromotionSchema.pre('validate', function(next){
  var code = "";
  var charSet = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789";

  for(var i=0; i < 5; i++) {
    code+= charSet.charAt(Math.floor(Math.random()*charSet.length));
  };
  this.code = code;
  next();
});

mongoose.model('Promotion', PromotionSchema);


