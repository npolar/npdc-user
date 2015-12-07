'use strict';

// @ngInject

var UserUpdateController = function ($scope, $http, $location, $routeParams, NpolarApiSecurity, npolarApiConfig, NpolarMessage) {
  const resetUri = 'https://' + npolarApiConfig.base.split('//')[1]+'/user/reset';

  $scope.name = $routeParams.id;
  $scope.security = NpolarApiSecurity;

  $scope.update = function(user) {
    $http({
      method: 'POST',
      url: resetUri,
      data: {password: user.password, name: user.name},
      headers: { 'Authorization': 'Bearer ' + $scope.security.getJwt() }
    }).then(function success(data){
      NpolarMessage.info("Your credentials where successfuly updated");
      $location.path('.');
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

module.exports = UserUpdateController;
