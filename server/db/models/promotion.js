'use strict';
var mongoose = require('mongoose');

var PromotionSchema = new mongoose.Schema({
  title: {
    type: String
  },
  code: {
    type: String
  },
  parameters: {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  },
  creationDate: Date,
  expirationDate: Date
});

PromotionSchema.pre('create', function(next){
  var code = "";
  var charSet = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789";

  for(var i=0; i < 8; i++) {
    code+= charSet.charAt(Math.floor(Math.random()*charSet.length));
    return code;
  };
});

mongoose.model('Promotion', PromotionSchema);


