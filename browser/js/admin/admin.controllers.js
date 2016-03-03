app.controller('AdminProductsCtrl', function(products, $state, $scope) {
  $scope.products = products;
});

app.controller('AdminUsersCtrl', function(users, $state, $scope) {
  $scope.users = users;
});

app.controller('AdminOrdersCtrl', function(orders, $state, $scope) {
  $scope.orders = orders;
});

