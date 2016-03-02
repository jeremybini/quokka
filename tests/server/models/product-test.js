/* PRODUCT MODEL TESTS */
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');
var Review = mongoose.model('Review');

describe('Product model', function() {

  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  describe('reviews and categories', function() {
    var createProduct = function() {
      return Product.create({ title: 'Jacket', description: 'fuzzy', price: 10, photoUrl: 'www.google.com' })
    };
    it('should have a categories array', function(done) {
      createProduct().then(function(product) {
        expect(product.categories).to.be.a('array');
        done();
      }).then(null, function(err) {
        done(err);
      })
    });

    it('should have a reviews array', function(done) {
      createProduct().then(function(product) {
        expect(product.reviews).to.be.a('array');
        done();
      }).then(null, function(err) {
        done(err);
      })
    });
  });

  describe('can add and remove reviews', function() {
    var review, product;
    beforeEach('create a product and a review', function(done) {
      var productToAddReviews = function() {
        return Product.create({
          title: 'Dog Pants',
          description: 'Khakis',
          price: 50,
          photoUrl: 'www.google.com'
        })
      };
      productToAddReviews().then(function(newProduct) {
        product = newProduct;
        return Review.create({
          rating: 3,
          content: 'Pants are great!',
          product: newProduct._id
        })
      })
          .then(function(newReview) {
            review = newReview;
            done();
          })
          .then(null, function(err) {
            done(err);
          })
      });

    it('can add a review', function(done) {
      Product.addReview(review)
          .then(function(productWithAddedReview) {
            expect(productWithAddedReview.reviews).to.have.length(1);
            done();
          })
          .then(null, function(err) {
            done(err);
          });
    });
    it('can remove a review', function(done) {
      Product.addReview(review).then(function() {
        Product.removeReview(review)
            .then(function(productWithRemovedReview) {
              expect(productWithRemovedReview.reviews).to.have.length(0);
              done();
            })
            .then(null, function(err) {
              done(err);
            })
      })
    })
  });
});
