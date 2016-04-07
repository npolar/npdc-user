'use strict';

let UserShowController = function ($scope, $controller, $routeParams, Person, User, npdcAppConfig) {
  'ngInject';

  $controller('NpolarBaseController', {$scope: $scope});
  $controller('NpolarLoginController', {$scope: $scope});

  $scope.id = $routeParams.id;

  $scope.personHref = function(uri) {
    if (/api\.npolar\.no/.test(uri)) {
      let id = uri.split('/').slice(-1)[0];
      // /en/people/
      // /no/ansatte/
      return `http://www.npolar.no/no/ansatte/${id}`;
    } else {
      return '';
    }
  };

  $scope.name = function () {
    let user = $scope.document;
    return user.first_name ? `${user.first_name} ${user.last_name}`: user._id;
  };

  $scope.active = function () {
    let user = $scope.document;
    return user.active || user.currently_employed;
  };

  $scope.isLoggedInAs = function() {
    return ($scope.security.getUser().email === $routeParams.id);
  };

  let show = function(resource, id = {}) {
    $scope.resource = resource;
    let invariants = { fields: "_id,name,systems,groups,active,created,updated,uri" };
    let query = Object.assign({}, id, invariants);
    $scope.show(query);
  };

  show(Person, { id: $routeParams.id.split('@')[0] });
};

module.exports = UserShowController;
