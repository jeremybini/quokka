app.config(function($stateProvider) {
  $stateProvider.state('adminHomePage', {
    url: '/admin',
    templateUrl: '/js/admin/index.html',
    data: {
      authenticate: true,
      admin: true
    }
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
    controller: 'AdminUsersCtrl',
    data: {
      authenticate: true,
      admin: true
    }
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
    controller: 'AdminOrdersCtrl',
    data: {
      authenticate: true,
      admin: true
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
      },
      categories: function(CategoryFactory) {
        return CategoryFactory.fetchAll();
      }
    },
    controller: 'AdminProductsCtrl',
    data: {
      authenticate: true,
      admin: true
    }
  });
});

app.config(function($stateProvider) {
  $stateProvider.state('adminOneOrder', {
    url: '/admin/orders/:orderId',
    templateUrl: '/js/admin/admin.orderview.template.html',
    resolve: {
      order: function(OrderFactory, $stateParams) {
        return OrderFactory.fetchById($stateParams.orderId);
      }
    },
    controller: 'AdminOneOrderCtrl',
    data: {
      authenticate: true,
      admin: true
    }
  });
});

app.config(function($stateProvider) {
  $stateProvider.state('addProduct', {
    url: '/admin/products/addproduct',
    templateUrl: '/js/admin/admin.edit.product.html'
  });
});

app.config(function($stateProvider) {
  $stateProvider.state('editProduct', {
        url: '/admin/products/:_id/edit',
        templateUrl: '/js/admin/admin.edit.product.html',
        params: {
          product: null
        },
        data: {
          authenticate: true,
          admin: true
        }
      });
});

app.config(function($stateProvider) {
  $stateProvider.state('adminCreatePromotion', {
    url: '/admin/promotions',
    templateUrl: '/js/admin/admin.promotions.template.html',
    resolve: {
      promotions: function(PromotionFactory) {
        return PromotionFactory.fetchAll();
      }
    },
    controller: 'AdminPromotionsCtrl',
    data: {
      authenticate: true,
      admin: true
    }
  });
});



