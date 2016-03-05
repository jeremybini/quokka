app.controller('AdminProductsCtrl', function(products, $state, $scope, AuthService) {
  $scope.products = products;
  $scope.goToEditState = function(product) {
    $state.go('editProduct', {_id: product._id, product: product });
  }
});

app.controller('AdminEditProductCtrl', function($stateParams, $state, ProductFactory, $scope) {
  $scope.product = $stateParams.product;
  $scope.categories = ['Dogs', 'Cats', 'Other Critters'];
  $scope.categoryName = $scope.product.categories[0].name;
  $scope.save = function(product) {
    ProductFactory.update(product._id, product);
    $state.go('adminAllProducts');
  };
  $scope.delete = function(product) {
    ProductFactory.delete(product._id);
    $state.go('adminAllProducts');
  };
  $scope.addNewCategory = function(category) {

  }
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

