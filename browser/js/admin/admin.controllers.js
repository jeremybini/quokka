app.controller('AdminProductsCtrl', function(products, $state, $scope) {
  $scope.products = products;
});

app.controller('AdminUsersCtrl', function(users, $state, $scope) {
  $scope.users = users;
});

app.controller('AdminOrdersCtrl', function(orders, OrderFactory, $state, $scope) {
  $scope.orders = orders;
  $scope.statuses = ['Cart', 'Submitted', 'Processing', 'Completed', 'Cancelled'];
  $scope.editOrder = function(order) {
    console.log("made it to editing order");
    OrderFactory.update(order._id, {status: order.status})
    .then(function(result) {
      console.log("made it to result:", result);
    });
  };
});

