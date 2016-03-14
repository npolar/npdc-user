'use strict';

let PersonEditController = function ($scope, $controller, $routeParams, formula, npdcAppConfig, User) {
  'ngInject';

  // Extend -> NpolarEditController
  $controller('NpolarEditController', { $scope: $scope });

  if ($scope.security.isAuthorized('read', User.path)) {

    // Person -> npolarApiResource -> ngResource
    $scope.resource = User;

    // Formula ($scope.formula is set by parent)
    $scope.formula = formula.getInstance({
      schema: '//api.npolar.no/schema/user-1',
      form: 'edit/formula.json',
      templates: npdcAppConfig.formula.templates
    });

    // edit (or new) action
    $scope.edit();
  }

};

module.exports = PersonEditController;
