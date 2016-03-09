/* PAYMENT FORM STATE */
app.config(function($stateProvider) {
  
  $stateProvider.state('payment', {
    url: '/payment',
    templateUrl: '/js/cart/payment-entry.template.html',
    controller: function($scope, CartFactory, $state) {
      $scope.checkout = function(orderId) {
        return CartFactory.submitOrder(orderId)
        .then(() => {
          $state.go('home');
        });
      }
    }
  });

});