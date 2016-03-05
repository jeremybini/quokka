app.controller('ProductCtrl', function(product, $state, $scope, CartFactory) {
	$scope.product = product;
	$scope.cartQuantity = 1;

	$scope.filterByCategory = function() {
		return function (product) {
			return product.categories
		}
	}

	$scope.addToCart = function() {
		return CartFactory.add($scope.product, $scope.cartQuantity);
	};
});

app.controller('ProductsCtrl', function(products, ProductFactory, $state, $scope) {
	$scope.products = products;
});