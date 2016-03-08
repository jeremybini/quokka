app.controller('AdminProductsCtrl', function($state, $scope, products, categories, AuthService, CategoryFactory) {
  $scope.products = products;
  $scope.categories = categories;

  $scope.goToEditState = function(product) {
    $state.go('editProduct', {_id: product._id, product: product });
  };

  $scope.filterByCategory = function(product) {
    return CategoryFactory.filterProductsByCategory(product, $scope.activeCategory);
  };
});

app.controller('AdminEditProductCtrl', function($scope, $stateParams, $state, $filter, ProductFactory, CategoryFactory) {
  $scope.categories = CategoryFactory.fetchAll();
  $scope.product = $stateParams.product || {};
  $scope.isEditProduct = $scope.product._id !== undefined;

  if ($scope.isEditProduct) {
    $scope.decimalPrice = ($scope.product.price / 100).toFixed(2);
  } else {
    $scope.product.categories = [];
  }

  $scope.searchText = null;
  $scope.allCategories = CategoryFactory.getCategories();

  $scope.transformChip = function transformChip(chip) {
    console.log(chip);
    // If it is an object, it's already a known chip
    if (angular.isObject(chip)) {
      return chip;
    }
    // Otherwise, create a new one
    return { name: chip }
  };

  $scope.querySearch = function querySearch(query) {
    //return $scope.categories;
    return $scope.allCategories.filter(function(category) {
      return category.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  };

  $scope.save = function(product, decimalPrice) {
    var match = false;
    CategoryFactory.fetchAll().then(function(categories) {
      $scope.categories = categories;
      $scope.categories.forEach(function(category) {
        if (category.name === product.categories[product.categories.length - 1].name) {
          match = true;
        }
      });
      if (match === false) {
        return CategoryFactory.add(product.categories[product.categories.length - 1].name)
      }
    }).then(function(category) {
      product.categories.push(category._id);
      product.price = decimalPrice * 100;
      if ($scope.isEditProduct) {
        ProductFactory.update(product._id, product).then($state.go('adminAllProducts'));
      } else {
        ProductFactory.create(product).then($state.go('adminAllProducts'));
      }
    });
    //      .then(function() {
    //        product.price = decimalPrice * 100;
    //        if ($scope.isEditProduct) {
    //          console.log('is updating ', product);
    //          ProductFactory.update(product._id, product).then($state.go('adminAllProducts'));
    //        } else {
    //          ProductFactory.create(product).then($state.go('adminAllProducts'));
    //        }
    //      })
    //}

    //if (product.category)
    //product.price = decimalPrice * 100;
    //if ($scope.isEditProduct) {
    //  ProductFactory.update(product._id, product).then($state.go('adminAllProducts'));
    //} else {
    //  ProductFactory.create(product).then($state.go('adminAllProducts'));
    //}
  };

  $scope.delete = function(product) {
    ProductFactory.delete(product._id);
    $state.go('adminAllProducts');
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

  $scope.resetPassword = function(user) {
    UserFactory.update(user._id, {resetPassword: true});
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
  $scope.parameters = ['Category', 'Product', 'All'];
  ProductFactory.fetchAll()
  .then(function(products) {
    $scope.products = products;
  });
  CategoryFactory.fetchAll()
  .then(function(categories) {
    $scope.categories = categories;
  });
  $scope.updated = false;
  $scope.deleted = false;
  $scope.created = false;
  $scope.actuallyCreated = false;

  $scope.editPromotion = function(promotion) {
    promotion.expirationDate = promotion.readableDate;
    if (promotion.promotype === 'Category') {
      promotion.parameters.category = $scope.categories.filter(function(category) {
        return category.name === promotion.parameters.category.name;
      })[0];
    } else if (promotion.promotype === 'Product') {
      promotion.parameters.product = $scope.products.filter(function(product) {
        return product.title === promotion.parameters.product.title;
      })[0];
    }
    console.log(promotion);
    PromotionFactory.update(promotion._id, promotion)
    .then(function() {
        PromotionFactory.fetchAll();
    })
    .then(function() {
      $scope.updated = true;
      $scope.deleted = false;
      $scope.created = false;
      $scope.actuallyCreated = false;
    });
  };

  $scope.deletePromotion = function(promotion) {
    PromotionFactory.delete(promotion._id)
    .then(function() {
      $scope.updated = false;
      $scope.deleted = true;
      $scope.created = false;
      $scope.actuallyCreated = false;
    });
  };

  $scope.createPromotion = function(promotion) {

    if (!$scope.created) {
      $scope.updated = false;
      $scope.deleted = false;
      $scope.created = true;
      $scope.actuallyCreated = false;
      $scope.newpromotion = {};
    } else {
      //actually create promotion
      promotion.expirationDate = promotion.readableDate;
      promotion.parameters = {};
      if (promotion.promotype === 'Category') {
        promotion.parameters.category = $scope.categories.filter(function(category) {
          return category.name === $scope.categoryName;
        })[0];
      } else if (promotion.promotype === 'Product') {
        promotion.parameters.product = $scope.products.filter(function(product) {
          return product.title === $scope.productName;
        })[0];
      }
      PromotionFactory.add(promotion)
      .then(function() {
        PromotionFactory.fetchAll();
      })
      .then(function() {
        $scope.promotions.forEach(function(item) {
          item.expirationDate = item.expirationDate.slice(0, 10);
        });
        $scope.updated = false;
        $scope.deleted = false;
        $scope.created = false;
        $scope.actuallyCreated = true;
      });
    }
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

