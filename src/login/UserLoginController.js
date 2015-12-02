'use strict';

// @ngInject
let UserLoginController = function ($scope, $controller, $http, $location, NpolarApiMessage, Gouncer, npolarApiConfig, npdcAppConfig) {
  
  $controller('NpolarLoginController', { $scope: $scope });
  $scope.onetimePasswordReceived = false;
  
  $scope.loginAndRedirectToOrigin = function(email,password) {
    
    Gouncer.authenticate(email, password).then(function(response) {
      $scope.onLogin(response);
      window.location = window.location.origin;
      
    }, $scope.onLoginError);
  };
  
  $scope.logoutAndRedirectToOrigin = function() {
    $scope.logout();
    window.location = window.location.origin;
  };
  
  $scope.isWaitingForOnetimePassword = function() {
    return ($scope.onetimePasswordReceived || ($location.path() === '/login/1-time') );
  };
  
  if ($scope.security.isAuthenticated()) {
    // Already logged in?
    $scope.user = $scope.security.getUser();
  } else {
    // 1-time password link?
    if ($location.path() === '/login/1-time') {
      if (!$scope.user) {
        $scope.user = {};
      }
      if ($location.search().username) {
        $scope.user.email = $location.search().username;
      }
      if ($scope.user.email && $location.search().code && !$scope.user.password) {
        $scope.user.password = $location.search().code;
        $scope.loginAndRedirectToOrigin($scope.user.email,$scope.user.password);
      }
    }
  }
  
  $scope.password_or_code = function() {
    if ($scope.isWaitingForOnetimePassword()) {
      return 'code';
    } else {
      return 'password';
    }
  };
  
  npdcAppConfig.cardTitle = "Login";
  
  $scope.emailOnetimePassword = function(email) {
    Gouncer.onetime(email).then(function success(data){  
      $scope.onetimePasswordReceived = true;
      NpolarApiMessage.emit("npolar-info", `1-time password sent to: ${email}`);
    });
  };

};

module.exports = UserLoginController;
