app.config(function ($stateProvider) {
  $stateProvider.state('products', {
    url: '/products',
    templateUrl: '/js/products/products-list.template.html',
    resolve: {
    	products: function(ProductFactory) {
    		return ProductFactory.fetchAll()
    	},
      categories: function(CategoryFactory) {
        return CategoryFactory.fetchAll()
      }
    },
    controller: 'ProductsCtrl'
  });

  $stateProvider.state('product', {
    url: '/products/:id',
    templateUrl: '/js/products/product-view.template.html',
    resolve: {
    	product: function(ProductFactory, $stateParams) {
    		return ProductFactory.fetchById($stateParams.id);
    	},
      reviews: function(ProductFactory, $stateParams) {
        return ProductFactory.fetchReviews($stateParams.id);
      }
    },
    controller: 'ProductCtrl'
  });
});