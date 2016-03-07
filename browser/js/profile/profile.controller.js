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

app.controller('PasswordResetCtrl', function($scope, $state, Session, UserFactory) {
	$scope.error = {
		message: "Please Reset Your Password.",
		type: 'warning'
	};

	$scope.validPassword = function() {
		if ($scope.reset) {
    	return $scope.reset.newPassword === $scope.reset.newPasswordConfirmation;
  	}
  }

	$scope.sendReset = function () {
    $scope.error = {};
    $scope.resetForm.$setPristine();
    UserFactory.update(Session.user._id, {
    	password: $scope.reset.newPassword
    })
    .then(function () {
    	$scope.reset = null;
      $state.go('home');
    })
    .catch(function () {
      $scope.error = {
      	message: 'Invalid signup credentials.',
      	type: 'danger'
      }
    });
  };
})