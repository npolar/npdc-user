'use strict';

/**
 * @ngInject
 */
var UserRegisterController = function ($scope, $http, $location, $routeParams, npolarApiConfig, NpolarApiMessage, User, base64) {
  const registrationUri = "https://"+npolarApiConfig.base.split("//")[1]+"/user/register";
  const confirmationUri = "https://"+npolarApiConfig.base.split("//")[1]+"/user/confirm";
  const captchaUri = "https://api.npolar.no/_captcha";
  
  $scope.captcha = {
	uuid: null,
	src: "//:0",
	string: ""
  };

  $scope.resource = User;
  $scope.user = { link: `https://${window.location.host}/user/confirm` };

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

  $scope.register = function(user) {
    if (user.password !== user.password2) {
      NpolarApiMessage.emit("npolar-api-error", "Password mismatch! Please enter the same password twice.");
    } else {
      $scope.user = user;
      $http({
        method: "POST",
        url: registrationUri,
        data: $scope.user,
        headers: {
          "Authorization": "Sicas " + base64.encode($scope.captcha.uuid + ":" + $scope.captcha.string)
        }
      }).then(function success() {
        NpolarApiMessage.emit("npolar-info", "You should receive a confirmation mail in a short while");
        $location.path(".");
      }, function error(res) {
        NpolarApiMessage.emit("npolar-api-error", (typeof res.data == "object" && res.data && res.data.error ? res.data.error : "Registration failed"));
      });
    }
  };

  $scope.confirm = function(id) {
      $http({
        method: "GET",
        url: confirmationUri+'/'+$routeParams.id
      }).then(function success() {
        NpolarApiMessage.emit("npolar-info", "Confirmation successful. You can now login with your new account");
        $location.path(".");
      }, function error() {
        NpolarApiMessage.emit("npolar-api-error", "Confirmation failed");
      });
  };
  
  if($scope.captcha) {
    ($scope.captcha.renew = function() {
      $http({
        method: "GET",
        url: captchaUri + "/?width=100&height=50&time=" + Date.now()
      }).then(function(response) {
        $scope.captcha.src = captchaUri + response.data.path;
        $scope.captcha.uuid = response.data.uuid;
        $scope.captcha.string = "";
      });
    })();
  }

  $scope.valid = function() {
    return (!$scope.captcha || $scope.captcha.string) && $scope.user.email && $scope.user.name && $scope.user.password && ($scope.user.password === $scope.user.password2);
  };
};

module.exports = UserRegisterController;
