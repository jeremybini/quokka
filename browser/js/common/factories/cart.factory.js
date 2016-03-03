/* cart factory */

'use strict';

app.factory('CartFactory', function($http, ProductFactory, $log) {

  var currentCart = [];

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

  CartFactory.update = function() {

  };

  CartFactory.clearCart = function() {

  };





  return CartFactory;

});

