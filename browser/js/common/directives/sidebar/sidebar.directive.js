app.directive('sideBar', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/common/directives/sidebar/sidebar.template.html',
		scope: {
			item: '='
		}
	}
})