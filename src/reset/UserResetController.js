'use strict';

// @ngInject

var UserResetController = function ($scope, $http, $location, npolarApiConfig, NpolarApiMessage, base64) {
  const onetimeUri = 'https://' + npolarApiConfig.base.split('//')[1]+'/user/onetime';
  const resetUri = 'https://' + npolarApiConfig.base.split('//')[1]+'/user/reset';

  $scope.user = {};

  $scope.init = function(user) {
    $scope.user = user;

    $http({
      method: 'POST',
      url: onetimeUri,
      data: $scope.user
    }).then(function success(data){
      $location.path('./reset/password');
      $scope.user = user;
    });
  };

  $scope.reset = function(user) {
    $http({
      method: 'POST',
      url: resetUri,
      data: {password: user.password},
      headers: {
        'Authorization': 'Basic ' + base64.encode(user.email + ':' + user.onetime)
      }
    }).then(function success() {
      $location.path('.');
      NpolarApiMessage.emit("npolar-info", "Your password was successfully updated.");
    });
  };

  $scope.compare = function(user) {
    if (user.password2 !== undefined) {
      if (user.password !== user.password2) {
        $scope.pwdStyle = { color: "rgb(215,10,83)", "border-color": "rgb(215,10,83)" };
      } else {
        $scope.pwdStyle = { color: "rgb(34,139,34)", "border-color": "rgb(34,139,34)" };
      }

      if (user.password2 === "") {
        $scope.pwdStyle={};
      }
    }
  };
};

module.exports = UserResetController;