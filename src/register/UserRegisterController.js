'use strict';

/**
 * @ngInject
 */
var UserRegisterController = function ($scope, $http, $location, $routeParams, npolarApiConfig, NpolarApiMessage, User) {

  const message = NpolarApiMessage;
  const registrationUri = "https://"+npolarApiConfig.base.split("//")[1]+"/user/register";
  const confirmationUri = "https://"+npolarApiConfig.base.split("//")[1]+"/user/confirm";

  $scope.resource = User;
  $scope.user = {link: `https://${window.location.host}/user/confirm`};

  $scope.compare = function(user) {
    if (user.password2 !== undefined) {
      if (user.password !== user.password2) {
        $scope.pwdStyle={color: 'rgb(215,10,83)', 'border-color': 'rgb(215,10,83)'};
      } else {
        $scope.pwdStyle={color: 'rgb(34,139,34)', 'border-color': 'rgb(34,139,34)'};
      }

      if (user.password2 === "") {
        $scope.pwdStyle={};
      }
    }
  };

  $scope.register = function(user) {
    if (user.password !== user.password2) {
      message.emit("npolar-api-error", "Password mismatch. make sure the passwords are written the same");
    } else {
      $scope.user = user;
      var req = { method: "POST", url: registrationUri, data: $scope.user };
      $http(req).success(reponse => {$location.path('.');}).error(
        response => { message.emit("npolar-api-error", "Registration failed"); }
      );
    }
  };

  $scope.confirm = function(id) {
      var req = { method: "GET", url: confirmationUri+$routeParams.id };
      $http(req).success(response => { $location.path('.');}).error(
        response => { message.emit("npolar-api-error", "Confirmation failed"); }
      );
  };
};

module.exports = UserRegisterController;
