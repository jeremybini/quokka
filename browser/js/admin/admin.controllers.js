app.controller('AdminProductsCtrl', function(products, $state, $scope) {
  $scope.products = products;
});

app.controller('AdminUsersCtrl', function(users, UserFactory, $state, $scope) {
  $scope.users = users;

  $scope.editUser = function(user) {
    UserFactory.update(user._id, {status: user.admin, email: user.email});
  };

  $scope.deleteUser = function(user) {
    UserFactory.delete(user._id)
    .then(function() {
      $scope.$digest();
    });
  };

});

app.controller('AdminOrdersCtrl', function(orders, OrderFactory, $state, $scope) {
  $scope.orders = orders;
  $scope.statuses = ['Cart', 'Submitted', 'Processing', 'Completed', 'Cancelled'];

  $scope.editOrder = function(order) {
    OrderFactory.update(order._id, {status: order.status});
  };

  $scope.deleteOrder = function(order) {
    OrderFactory.delete(order._id)
    .then(function() {
      $scope.$digest();
    });
  };

});

