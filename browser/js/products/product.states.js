app.config(function ($stateProvider) {
  $stateProvider.state('products', {
  	//could also use $location.search() to get query string => /products?categories=dogs
  	// and then use Product.fetchByCategory
  	//but probably better to just use /categories/:category_name
    url: '/products',
    templateUrl: '/js/products/products-list.template.html',
    resolve: {
    	products: function(ProductFactory) {
    		return ProductFactory.fetchAll()
    	}
    },
    controller: 'ProductsCtrl'
  });
});

app.config(function ($stateProvider) {
  $stateProvider.state('product', {
    url: '/products/:id',
    templateUrl: '/js/products/product-view.template.html',
    resolve: {
    	product: function(ProductFactory, $stateParams) {
    		return ProductFactory.fetchById($stateParams.id)
    	}
    },
    controller: 'ProductCtrl'
  });
});