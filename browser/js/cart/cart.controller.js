//CART CONTROLLER
app.controller('CartController', function($scope, CartFactory, cart) {
  $scope.cart = cart;

  $scope.remove = function(productId) {
    return CartFactory.remove(productId)
    .then(function(cart) {
      $scope.cart = cart;
    });
  };

  $scope.update = function(product, quantity) {
    return CartFactory.update(product, quantity)
    .then(function(cart) {
      $scope.cart = cart;
    });
  };

  $scope.empty = function() {
    return CartFactory.empty()
    .then(function(cart) {
      $scope.cart = cart;
    });
  };

  //submit button functionality
  $scope.checkout = function(orderId) {
    console.log(orderId, "THE ORDER ID");
    return CartFactory.submitOrder(orderId)
    .then(function(cart) {
      console.log(cart, "THE CART");
      $scope.cart = cart;
    });
  };

});