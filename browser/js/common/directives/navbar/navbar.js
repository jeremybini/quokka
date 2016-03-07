app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, $window) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope, element, attr) {

            scope.items = [
                { label: 'Catalogue', state: 'products' },
                { label: 'Our Mission', state: 'about' },
                { label: 'Profile', state: 'profile({ id: user._id })', auth: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.isAdmin = function () {
                return AuthService.isAdmin();
            }

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

            var $win = angular.element($window);
            $win.on('scroll', function (e) {
                if ($window.pageYOffset >= 180) {
                    element.addClass('navbar-stuck');
                } else {
                    element.removeClass('navbar-stuck');
                }
            });
        }

    };

});
