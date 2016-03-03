app.config(function($stateProvider) {
  $stateProvider.state('adminHomePage', {
    url: '/admin',
    templateUrl: '/js/admin/index.html'
  });
});

app.config(function($stateProvider) {
  $stateProvider.state('adminAllProducts', {
    url: '/admin/products',
    templateUrl: '/js/admin/admin.template.html',
    resolve: {
      products: function(ProductFactory) {
        return ProductFactory.fetchAll();
      }
    },
    controller: 'AdminProductsCtrl'
  });
});

app.config(function($stateProvider) {
  $stateProvider.state('adminAllUsers', {
    url: '/admin/users',
    templateUrl: '/js/admin/admin.users.template.html',
    resolve: {
      users: function(UserFactory) {
        return UserFactory.fetchAll();
      }
    },
    controller: 'AdminUsersCtrl'
  });
});

app.config(function($stateProvider) {
  $stateProvider.state('adminAllOrders', {
    url: '/admin/orders',
    templateUrl: '/js/admin/admin.template.html',
    resolve: {
      orders: function(OrderFactory) {
        return OrderFactory.fetchAll();
      }
    },
    controller: 'AdminOrdersCtrl'
  });
});
