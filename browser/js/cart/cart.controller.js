//CART CONTROLLER
app.controller('CartController', function($scope, CartFactory, cart) {
  $scope.cart = cart;
  $scope.subtotal = 0;

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
    return CartFactory.submitOrder(orderId)
    .then(function(cart) {
      $scope.cart = cart;
    });
  };

  $scope.orderSubtotal = function() {
    return $scope.cart.products.reduce(function(total, item) {
      var price = item.price || item.product.price;
      return total+=(price* item.quantity)/100;
    }, 0);
  };

  $scope.applyPromo = function() {
    if ($scope.promotion) {
      return CartFactory.applyPromo($scope.promotion)
      .then(function(cart) {
        $scope.cart = cart;
        if ($scope.cart.promotion) {
          $scope.promoMessage = {
            type: 'success',
            message: $scope.promotion + " Woohoo! Discount was applied to your order! You saved " + $scope.cart.promotion.discount + "% on select products!"
          };
        } else {
          $scope.promoMessage = {
            type: 'danger',
            message: "That's not a valid promo. Sorry :("
          };
        }
      });
    }
  };

  $scope.removePromo = function() {
    $scope.promoMessage = null;
    $scope.promotion = null;
    if ($scope.cart.promotion) {
      return CartFactory.removePromo()
      .then(function(cart) {
        $scope.removeMessage = {
          type: 'removed',
          message: "Promo code removed successfully"
        };
        $scope.cart = cart;
      });
    }
  };

});