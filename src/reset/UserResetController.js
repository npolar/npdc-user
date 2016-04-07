'use strict';

var UserResetController = function ($scope, $location, Gouncer) {
  'ngInject';

  $scope.user = {};

  if ($location.search().username) {
    $scope.user.email = $location.search().username;
  }

  $scope.resetPasswd = function () {
    Gouncer.reset($scope.user).$promise.then(() => {
      $scope.user.password = $scope.user.password2 = undefined;
    });
  };

  $scope.compare = function() {
    let user = $scope.user;
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
