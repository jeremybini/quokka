app.directive('rating', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/common/directives/rating/rating.template.html',
		scope: {
			rating: '=',
			readOnly: '='
		},
		link: function(scope) {
			scope.readOnly = false;
		}
	}
})