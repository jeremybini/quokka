app.controller('ProductCtrl', function(product, ProductFactory, $state, $scope) {
	$scope.product = product;
});

app.controller('ProductsCtrl', function(products, ProductFactory, $state, $scope) {
	$scope.products = products
});