app.config(function($stateProvider) {
	$stateProvider
		.state('profile', {
			url: '/profile/:id',
			templateUrl: '/js/profile/profile.template.html',
			resolve: {
				user: function(UserFactory, $stateParams) {
					return UserFactory.fetchById($stateParams.id);
				},
				orders: function(OrderFactory, $stateParams) {
					return OrderFactory.fetchAllforUser($stateParams.id)
				}
			},
			controller: 'ProfileController'
		})

		.state('viewOrder', {
			url: '/profile/:id/orders/:orderId',
			templateUrl: '/js/profile/view-order.template.html',
			resolve: {
				order: function(OrderFactory, $stateParams) {
					return OrderFactory.fetchById($stateParams.orderId);
				}
			},
			controller: 'UserOrderController'
		})

		// .state('editProfile', {
		// 	url: 'profile/:id/edit',
		// 	templateUrl: '/js/profile/profile-edit.template.html',
		// 	resolve: {
		// 		user: function(UserFactory, $stateParams) {
		// 			return UserFactory.fetchById($stateParams.id);
		// 		}
		// 	},
		// 	controller: 'ProfileController'
		// })


});