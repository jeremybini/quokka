app.factory('ProductFactory', function($http, $log) {
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
		
		fetchByCategory: function(categoryId) {
			return $http.get(homePath, {
				params: { categories: categoryId }
			})
			.then(res => res.data)
			.catch($log.error);
		}

	}
})