app.config(function($stateProvider) {
  $stateProvider.state('adminHomePage', {
    url: '/admin',
    templateUrl: '/js/admin/index.html',
    data: {
      authenticate: true
    }
  });
});

app.config(function($stateProvider) {
  $stateProvider.state('adminAllProducts', {
    url: '/admin/products',
    templateUrl: '/js/admin/admin.products.template.html',
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
    templateUrl: '/js/admin/admin.orders.template.html',
    resolve: {
      orders: function(OrderFactory) {
        return OrderFactory.fetchAll();
      }
    },
    controller: 'AdminOrdersCtrl'
  });
});

app.config(function($stateProvider) {
  $stateProvider
      .state('editProduct', {
        url: '/admin/products/:_id/edit',
        templateUrl: '/js/admin/admin.edit.product.html',
        params: {
          product: null
        }
      })
      //.state('manageProduct.delete', {
      //  url: '/delete',
      //  templateUrl: 'admin.edit.product.html',
      //  controller: function($stateParams, $http) {
      //    if (confirm('Are you sure you want to delete?')) {
      //      $http.delete('/cards/' + $stateParams._id)
      //          .then(function(res) {
      //            console.log(res);
      //          });
      //    }
      //  }
      //})
});


