'use strict';

// @ngInject

var UserLoginController = function ($scope, $controller, $http, $location, npolarApiConfig, npdcAppConfig) {
  
  $controller('NpolarLoginController', { $scope: $scope });
  const onetimeUri = 'https://' + npolarApiConfig.base.split('//')[1]+'/user/onetime';
  
  npdcAppConfig.cardTitle = "Login";
    
  if ($scope.security.isAuthenticated()) {
    $scope.user = $scope.security.getUser();
    
  } else {
    $scope.user = {};
  }
  
  $scope.onetimePasswordReceived = false;
  
  $scope.isWaitingForOnetimePassword = function() {
    return ($scope.onetimePasswordReceived || ($location.path() === '/login/1-time') );
  };
  
  if ($location.search().username) {
    $scope.user.email = $location.search().username;
  }
  
  $scope.onetimePassword = function(user) {
    
    $scope.user = user;
    let email = user.email;
    if (!/\w+@\w+/.test(email)) {
      email += "@npolar.no";
    }
    
    $http({
      method: 'POST',
      url: onetimeUri,
      data: {email }
    }).then(function success(data){
      
      $scope.onetimePasswordReceived = true;
      $location.path('/login/1-time');
      $location.search({ username: user.email });
      
      //NpolarApiMessage.emit("npolar-info", `1-time password sent to: ${user.email}`);
    });
  };

};

module.exports = UserLoginController;
