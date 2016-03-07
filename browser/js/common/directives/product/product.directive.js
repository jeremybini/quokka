app.directive('productBox', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/common/directives/product/product.template.html',
		scope: {
			product: '='
		}
	}
})