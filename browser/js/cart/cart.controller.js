//CART CONTROLLER
app.controller('CartController', function($scope, CartFactory) {
  $scope.cart = CartFactory.getCart();

  $scope.remove = function(productId) {
    return CartFactory.remove(productId);
  };

  $scope.update = function(productId, quantity) {
    return CartFactory.update(productId, quantity);
  };

  $scope.empty = function() {
    return CartFactory.empty();
  };

  //submit button functionality

});