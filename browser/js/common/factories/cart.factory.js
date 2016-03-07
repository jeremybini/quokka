/* cart factory */
'use strict';

app.factory('CartFactory', function($http, ProductFactory, $log) {

  var currentCart = [];

  var CartFactory = {};

  CartFactory.add = function(product, quantity) {
    return $http.post('/api/cart/', {productId: product._id, quantity: quantity})
    .then(function(res) {
      return res.data;
    })
    .then(function(cart) {
      currentCart = cart;
      return currentCart;
    })
    .catch($log.error);
  };

  CartFactory.remove = function(productId) {
    return $http.delete('/api/cart/' + productId)
    .then(function(res) {
      return res.data;
    })
    .then(function(cart) {
      currentCart = cart;
      return currentCart;
    })
    .catch($log.error);
  };

  CartFactory.update = function(product, quantity) {
    return $http.put('/api/cart/', {productId: product._id, quantity: quantity})
    .then(function(res) {
      return res.data;
    })
    .then(function(cart) {
      currentCart = cart;
      return currentCart;
    })
    .catch($log.error);
  };


  CartFactory.getCurrentCart = function() {
    return currentCart;
  };

  //fetch cart gets cart from backend
  CartFactory.fetchCart = function() {
    return $http.get('/api/cart/')
    .then(function(res) {
      return res.data
    })
    .catch($log.error);
  };

  CartFactory.submitOrder = function(orderId) {
    return $http.get('api/cart/submit');
  };

  CartFactory.empty = function() {
    return $http.get('/api/cart')
    .then(function(res) {
      return res.data;
    })
    .then(function(cart) {
      currentCart = cart;
    })
    .catch($log.error);
  };

  CartFactory.applyPromo = function(code) {
    return $http.get('/api/cart/apply-promo/' + code)
    .then(function(res) {
      currentCart = res.data;
      return currentCart;
    })
    .catch($log.error);
  };

  CartFactory.removePromo = function() {
    return $http.delete('/api/cart/apply-promo/')
    .then(function(res) {
      console.log(res.data, "IN CART FACTORY!!!!!!!");
      currentCart = res.data;
      return currentCart;
    })
    .catch($log.error);
  };

  return CartFactory;

});