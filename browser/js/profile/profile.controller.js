app.controller('ProfileController', function(user, orders, $scope, $state, $uibModal, OrderFactory) {
	$scope.user = user;
	$scope.orders = orders;

	$scope.viewOrder = function (orderId) {
    $uibModal.open({
      templateUrl: '/js/common/directives/modal/modal.template.html',
      controller: 'UserOrderController',
      resolve: {
        order: function () {
          return OrderFactory.fetchById(orderId);
        }
      }
    });
  };

});

app.controller('UserOrderController', function ($scope, $uibModalInstance, order) {

  $scope.order = order;

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});