app.config(function ($stateProvider) {
  $stateProvider.state("signup", {
    url: '/signup',
    templateUrl: 'js/signup/signup.html',
    controller: 'SignupCtrl'
  });
});

app.controller('SignupCtrl', function ($scope, AuthService, UserFactory, $state) {
  $scope.signup = {};
  $scope.error = null;

  $scope.validPassword = function() {
    return $scope.signup.password === $scope.signup.passwordConfirmation;
  }

  $scope.sendSignup = function (signupInfo) {
    $scope.error = null;
    $scope.signupForm.$setPristine();
    $scope.signup = null;
    AuthService.signup(signupInfo).then(function () {
        $state.go('home');
    }).catch(function () {
        $scope.error = 'Invalid signup credentials.';
    });
  };

});