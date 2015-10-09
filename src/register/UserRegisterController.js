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
  
  const captchaUri = "http://localhost:20938";
  $scope.useCaptcha = false;

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
      message.emit("npolar-api-error", "Password mismatch! Please enter the same password twice.");
    } else {
      $scope.user = user;
      $http({
        method: "POST",
        url: registrationUri,
        data: $scope.user,
		headers: {
			//"Authorization": "Sicas " + base64.encode($scope.captchaId + ":" + $scope.captcha)
		}
      }).success(reponse => { $location.path('.'); }).error(response => { message.emit("npolar-api-error", "Registration failed"); });
    }
  };

  $scope.confirm = function(id) {
      $http({
        method: "GET",
        url: confirmationUri+$routeParams.id
      }).success(response => { $location.path('.'); }).error(response => { message.emit("npolar-api-error", "Confirmation failed"); });
  };
  
  ($scope.renewCaptcha = function() {
    $http({
      method: "GET",
      url: captchaUri + "/captcha?width=100&height=50"
    }).success(response => {
      $scope.captchaImage = captchaUri + response.path;
      $scope.captchaId = response.uuid;
    });
  })();

  $scope.valid = function() {
    return (!$scope.useCaptcha || $scope.captcha) && $scope.user.email && $scope.user.name && $scope.user.password && ($scope.user.password === $scope.user.password2);
  };
};

module.exports = UserRegisterController;
