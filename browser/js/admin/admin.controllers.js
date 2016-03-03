app.controller('AdminProductsCtrl', function(products, $state, $scope) {
  $scope.products = products;
  console.log($scope.products);
});

app.controller('AdminUsersCtrl', function(users, $state, $scope) {
  $scope.users = users;
});

app.controller('AdminOrdersCtrl', function(orders, OrderFactory, $state, $scope) {
  $scope.orders = orders;
  console.log($scope.orders);
});

