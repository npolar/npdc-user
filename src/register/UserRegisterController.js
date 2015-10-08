'use strict';

/**
 * @ngInject
 */
var UserRegisterController = function ($scope, $controller, $routeParams, User) {

  // Extend -> NpolarEditController
  $controller('NpolarEditController', { $scope: $scope });
  
  if ($scope.security.isAuthorized('read', User.path)) {

    // Person -> npolarApiResource -> ngResource
    $scope.resource = User;
  
    // Formula ($scope.formula is set by parent)
    $scope.formula.schema = '//api.npolar.no/schema/user-1';
    $scope.formula.form = 'edit/formula.json';
    
    // edit (or new) action
    $scope.edit();
  }

};

module.exports = UserRegisterController;
