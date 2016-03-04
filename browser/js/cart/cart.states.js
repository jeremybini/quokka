/* CART STATES */
app.config(function($stateProvider) {
	
	$stateProvider.state('cart', {
		url: '/cart',
		templateUrl: '/js/cart/cart.template.html',
		resolve: {
			cart: function(CartFactory) {
				return CartFactory.getCart();
			}
		},
		controller: 'CartController'
	});

});