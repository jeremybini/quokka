/* cart factory */
'use strict';

app.factory('CartFactory', function($http, ProductFactory, $log) {

  var currentCart = [];

  var CartFactory = {};

  CartFactory.add = function(product, quantity) {
    return $http.post('/api/cart/add', {productId: product._id, quantity: quantity})
    .then(function(res) {
      return res.data;
    })
    .then(function(cart) {
      currentCart = cart;
    })
    .catch($log.error);
  };

  CartFactory.remove = function(product) {
    return $http.post('/api/cart/remove', {productId: product._id})
    .then(function(res) {
      return res.data;
    })
    .then(function(cart) {
      currentCart = cart;
    })
    .catch($log.error);
  };

  CartFactory.update = function(product, quantity) {
    return $http.post('/api/cart/update', {productId: product._id, quantity: quantity})
    .then(function(res) {
      return res.data;
    })
    .then(function(cart) {
      currentCart = cart;
    })
    .catch($log.error);
  };

  CartFactory.getCart = function() {
    return currentCart;
  };

  CartFactory.empty = function() {
    return $http.get('/api/cart/empty')
    .then(function(res) {
      return res.data;
    })
    .then(function(cart) {
      currentCart = cart;
    })
    .catch($log.error);
  };


  return CartFactory;

});