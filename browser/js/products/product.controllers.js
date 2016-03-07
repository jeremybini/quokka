app.controller('ProductCtrl', function(product, reviews, $state, $scope, CartFactory, ProductFactory) {
	$scope.product = product;
	$scope.reviews = reviews;
	$scope.message;
	$scope.cartQuantity = 1;

	$scope.addToCart = function() {
		$scope.message = $scope.cartQuantity + " " + $scope.product.title + " added to you cart!"
		return CartFactory.add($scope.product, $scope.cartQuantity);
	}

	$scope.addReview = function() {
		$scope.addingReview = true;
	}

	$scope.submitReview = function() {
		$scope.submittingReview = true;
		$scope.newReview.product = $scope.product._id;
		ProductFactory.submitReview($scope.newReview, $scope.product._id)
		.then(function(reviews) {
			$scope.reviews = reviews;
			$scope.addingReview = false;
			$scope.submittingReview = false;
		})
	}
});

app.controller('ProductsCtrl', function(products, $state, $scope, categories) {
	$scope.products = products;
	$scope.categories = categories;
	$scope.category;

	$scope.setCategory = function(category) {
		$scope.category = category
	};

	$scope.filterByCategory = function(product) {
		if( !$scope.category ) return true;
		return product.categories.find(function(category) {
			return category._id === $scope.category._id
		});
	};

});