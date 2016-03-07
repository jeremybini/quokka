/* USER MODEL */
'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var Schema = mongoose.Schema;
var Review = mongoose.model('Review');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');

var UserSchema = new Schema({
  admin: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  facebook: {
    id: String
  },
  google: {
    id: String
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  interests: {
    type: String
  },
  resetPassword: {
    type: Boolean,
    default: false
  }
});

// method to remove sensitive information from user objects before sending them out
UserSchema.methods.sanitize = function() {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
  var hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
      this.salt = this.constructor.generateSalt();
      this.password = this.constructor.encryptPassword(this.password, this.salt);
  }
  next();

});

UserSchema.statics.generateSalt = generateSalt;
UserSchema.statics.encryptPassword = encryptPassword;

UserSchema.method('correctPassword', function(candidatePassword) {
  return encryptPassword(candidatePassword, this.salt) === this.password;
});

UserSchema.methods.addReview = function (reviewObj) {
  var user = this;
  var review;

  return Review.create(reviewObj)
  .then(function (createdReview) {
    review = createdReview;
    user.reviews.addToSet(review._id);
    return user.save();
  })
  .then(function () {
    return Product.addReview(review)
  })
  .then(function() {
    return review;
  });
};

UserSchema.methods.removeReview = function (review) {
  var user = this;

  return review.remove()
  .then(function () {
    user.reviews.pull(review);
    return user.save();
  })
  .then(function() {
    return Product.removeReview(review);
  });
};

mongoose.model('User', UserSchema);

















