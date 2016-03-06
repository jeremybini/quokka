app.controller('AdminProductsCtrl', function(products, $state, $scope, AuthService) {
  $scope.products = products;
  $scope.goToEditState = function(product) {
    $state.go('editProduct', {_id: product._id, product: product });
  };
});

app.controller('AdminEditProductCtrl', function($stateParams, $state, ProductFactory, $scope) {
  $scope.product = $stateParams.product;
  $scope.categories = ['Dogs', 'Cats', 'Other Critters'];
  $scope.categoryName = $scope.product.categories[0].name;
  $scope.save = function(product) {
    if (product._id) {
      ProductFactory.update(product._id, product);
    } else {
      ProductFactory.create(product);
    }
    $state.go('adminAllProducts');
  };
  $scope.delete = function(product) {
    ProductFactory.delete(product._id);
    $state.go('adminAllProducts');
  };
  $scope.addNewCategory = function(category) {

  };
});

app.controller('AdminUsersCtrl', function(users, UserFactory, $state, $scope) {
  $scope.users = users;
  $scope.statuses = [true, false];
  $scope.updated = false;
  $scope.deleted = false;

  $scope.editUser = function(user) {
    UserFactory.update(user._id, {admin: user.admin, email: user.email});
    $scope.updated = true;
    $scope.deleted = false;
  };

  $scope.deleteUser = function(user) {
    UserFactory.delete(user._id)
    .then(function() {
      $scope.deleted = true;
      $scope.updated = false;
      $scope.users = $scope.users.filter(function(item) {
        return item._id !== user._id;
      });
    });
  };

});

app.controller('AdminPromotionsCtrl', function(promotions, PromotionFactory, ProductFactory, CategoryFactory, $scope) {

  $scope.promotions = promotions;
  var allPromotions = $scope.promotions;
  $scope.parameters = ['Category', 'Product', 'All'];
  $scope.promotions.forEach(function(promotion) {
    promotion.expirationDate = promotion.expirationDate.slice(0, 10);
  });
  ProductFactory.fetchAll()
  .then(function(products) {
    $scope.products = products;
  })
  CategoryFactory.fetchAll()
  .then(function(categories) {
    $scope.categories = categories;
  })
  $scope.updated = false;
  $scope.deleted = false;
  $scope.created = false;

  $scope.editPromotion = function(promotion) {
    promotion.expirationDate = promotion.expirationDate + "05:00:00.000Z";
    if (promotion.promotype === 'Category') {
      promotion.parameters = {category: promotion.parameters.category._id};
    } else if (promotion.promotype === 'Product') {
      promotion.parameters = {product: promotion.parameters.product._id};
    }
    console.log(promotion);
    PromotionFactory.update(promotion._id, promotion)
    .then(function(promotion) {
      $scope.updated = true;
      $scope.deleted = false;
      $scope.created = false;
    });
  };

  $scope.deletePromotion = function(promotion) {
    PromotionFactory.delete(promotion._id)
    .then(function() {
      $scope.updated = false;
      $scope.deleted = true;
      $scope.created = false;
    });
  };

});

app.controller('AdminOneOrderCtrl', function(order, $scope, $state) {
  $scope.order = order;
  $scope.back = function() {
    $state.go('adminAllOrders');
  };
});

app.controller('AdminOrdersCtrl', function(orders, OrderFactory, $state, $scope) {
  $scope.orders = orders;
  var allOrders = $scope.orders;
  $scope.statuses = ['Cart', 'Submitted', 'Processing', 'Completed', 'Cancelled'];
  $scope.updated = false;
  $scope.deleted = false;

  $scope.editOrder = function(order) {
    OrderFactory.update(order._id, {status: order.status});
    $scope.updated = true;
    $scope.deleted = false;
  };

  $scope.viewOrder = function(orderId) {
    $state.go('adminOneOrder', {orderId: orderId});
  };

  $scope.deleteOrder = function(order) {
    OrderFactory.delete(order._id)
    .then(function() {
      $scope.updated = false;
      $scope.deleted = true;
      $scope.orders = $scope.orders.filter(function(item) {
        return item._id !== order._id;
      });
    });
  };

  $scope.filter = function(status) {
      $scope.orders = allOrders;
      if (!status) return;
      $scope.orders = $scope.orders.filter(function(item) {
        return item.status === status;
      });
    };

});

