app.controller('ProductCtrl', function(product, reviews, $state, $scope, CartFactory) {
	$scope.product = product;
	$scope.reviews = reviews;
	$scope.cartQuantity = 1;
	$scope.cartMessage;

	$scope.addToCart = function() {
		CartFactory.add($scope.product, $scope.cartQuantity)
		.then(cart => {
			$scope.product.stock -= $scope.cartQuantity;
			$scope.cartMessage = {
				type: 'success',
				message: $scope.cartQuantity + " " + $scope.product.title + " added to you cart!"
			};
			$scope.cartQuantity = 1;
		})
		.catch(err => {
			$scope.cartMessage = {
				type: 'error',
				message: err.message
			};
		});
	}

	$scope.addReview = function() {
		$scope.addingReview = true;
	}

	$scope.submitReview = function() {
		if( $scope.newReview ) {
			//used for showing and hiding buttons/animations
			$scope.submittingReview = true;
			$scope.addingReview = false;

			//explicitly set product id on request body
			$scope.newReview.product = $scope.product._id;
			ProductFactory.submitReview($scope.newReview, $scope.product._id)
			.then(reviews => {
				$scope.newReview = null;
				$scope.reviews = reviews;
				$scope.submittingReview = false;
				$scope.reviewMessage = {
					type: 'success',
					message: 'Thanks for the review!'
				}
			})
			.catch(err => {
				$scope.submittingReview = false;
				$scope.reviewMessage = err.message;
			})
		} else {
			$scope.addingReview = false;
			$scope.reviewMessage = {
				type: 'error',
				message: 'You must enter valid stuffs'
			}
		}
	}
});

app.controller('ProductsCtrl', function(products, $state, $scope, categories, CategoryFactory) {
	$scope.products = products;
	$scope.categories = categories;
	$scope.activeCategory;

	$scope.setCategory = function(category) {
		$scope.activeCategory = category
	};

	$scope.filterByCategory = function(product) {
		return CategoryFactory.filterProductsByCategory(product, $scope.activeCategory);
	};

});