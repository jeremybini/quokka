app.controller('ProfileController', function(user, orders, $scope, $state) {
	$scope.user = user;
	$scope.orders = orders;

	$scope.viewOrder = function (orderId) {
    $state.go('viewOrder', { 
      id: $scope.user._id,
      orderId: orderId
    });
  };

});

app.controller('UserOrderController', function ($scope, order) {
  $scope.order = order;
});