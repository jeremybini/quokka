app.directive('orderView', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/common/directives/orders/order-view.template.html',
		scope: {
			order: '='
		}
	}
});