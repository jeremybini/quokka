app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
        	categories: function(CategoryFactory) {
        		return CategoryFactory.fetchAll();
        	},
        	products: function(ProductFactory) {
        		return ProductFactory.fetchFeatured(6);
        	}
        },
        controller: function($scope, categories, products) {
        	$scope.categories = categories;
        	$scope.products = products;
        }
    });
});