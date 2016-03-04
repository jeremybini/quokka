app.controller('ProductCtrl', function(product, $state, $scope, CartFactory) {
	$scope.product = product;
	$scope.cartQuantity = 1;

	$scope.addToCart = function() {
		console.log($scope)
		return CartFactory.add($scope.product._id, $scope.cartQuantity);
	}
});

app.controller('ProductsCtrl', function(products, ProductFactory, $state, $scope) {
	$scope.products = products
});