/* cart factory */
'use strict';

app.factory('CartFactory', function($http, ProductFactory, $log) {

  var currentCart = [];

  var CartFactory = {};

  CartFactory.addProduct = function(product) {
    return $http.post('/api/products/add', {productId: product._id})
    .then(function(res => res.data)
    .then(function(cart) {
      currentCart = cart;
    })
    .catch($log.error);
  };

  CartFactory.removeProduct = function(product) {
    return $http.post('/api/products/remove', {productId: product._id})
    .then(function(res => res.data))
    .then(function(cart) {
      currentCart = cart;
    })
    .catch($log.error);
  };

  CartFactory.update = function(product, quantity) {
    return $http.post('/api/products/update', {productId: product._id, quantity: quantity})
    .then(function(res => res.data))
    .then(function(cart) {
      currentCart = cart;
    })
    .catch($log.error);
  };

  CartFactory.clearCart = function() {
    return $http.delete('/api/products/clearCart')
    .then(function(res => res.data))
    .then(function(cart) {
      currentCart = cart;
    })
    .catch($log.error);
  };


  return CartFactory;

});

