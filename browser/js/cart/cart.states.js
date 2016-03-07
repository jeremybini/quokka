/* CART STATES */
app.config(function($stateProvider) {
	
	$stateProvider.state('cart', {
		url: '/cart',
		templateUrl: '/js/cart/cart.template.html',
    resolve: {
      cart: function(CartFactory) {
        // if (CartFactory.getCurrentCart().products) {
        //   return CartFactory.getCurrentCart();
        // } else {
          return CartFactory.fetchCart();
        // }
      }
    },
		controller: 'CartController'
	});

});