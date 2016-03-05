app.directive('orderView', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/common/directives/orders/order-view.template.html',
		scope: {
			order: '='
		},
		link: function(scope) {
			scope.totalItemPrice = function(item) {
				return item.price*item.quantity/100;
			};

			scope.orderTotal = function() {
				return scope.order.products.reduce(function(total, item) {
					return total+scope.totalItemPrice(item);
				}, 0);
			}
		}
	}
});