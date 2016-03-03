app.factory('ProductFactory', function($http, $log) {
	var homePath = '/api/products/'

	return {

		fetchAll: function() {
			return $http.get(homePath)
			.then(res => res.data)
			.catch($log.error);
		},

		fetchById: function(reviewId) {
			return $http.get(homePath+reviewId)
			.then(res => res.data)
			.catch($log.error);
		},
		
		fetchByCategory: function(categoryId) {
			return $http.get(homePath, {
				params: { categories: categoryId }
			})
			.then(res => res.data)
			.catch($log.error);
		},

		fetchReviews: function(productId) {
			return $http.get(homePath+productId+'/reviews')
			.then(res => res.data)
			.catch($log.error);
		},

		fetchReviewById: function(productId, reviewId) {
			return $http.get(homePath+productId+'/reviews/'+reviewId)
			.then(res => res.data)
			.catch($log.error);
		}
	}
})