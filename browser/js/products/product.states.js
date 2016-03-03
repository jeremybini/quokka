app.config(function ($stateProvider) {
  $stateProvider.state('products', {
  	//could also use $location.search() to get query string => /products?categories=dogs
  	// and then use Product.fetchByCategory
  	//but probably better to just use /categories/:category_name
    url: '/products',
    templateUrl: '/js/products/products-list.template.html',
    resolve: {
    	products: function(Product) {
    		return Product.fetchAll()
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
    	product: function(Product, $stateParams) {
    		return Product.fetchById($stateParams.id)
    	}
    },
    controller: 'ProductCtrl'
  });
});