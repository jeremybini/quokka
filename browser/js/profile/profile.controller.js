app.controller('ProfileController', function(user, orders, $scope, $state) {
	$scope.user = user;
	$scope.orders = orders;

	$scope.viewOrder = function(orderId) {
		$state.go('viewOrder', { id: $scope.user._id, orderId: orderId });
	}

	// $scope.editProfile = function() {
	// 	$state.go('editProfile', { id: $stateParams.id });
	// }
});

app.controller('UserOrderController', function(order, $scope, $state){
	$scope.order = order;
});