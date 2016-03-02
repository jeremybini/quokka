app.factory('Product', function($http, $log) {
	var homePath = '/api/products'

	return {

		fetchAll: function() {
			return $http.get(homePath)
			.then(res => res.data)
			.catch($log.error);
		},

		fetchById: function(id) {
			return $http.get(homePath+'/id')
			.then(res => res.data)
			.catch($log.error);
		},

		fetchByCategory: function(category) {
			return $http.get(homePath, {
				params: { category: category._id }
			})
			.then(res => res.data)
			.catch($log.error);
		},


	}
})