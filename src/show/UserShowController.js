'use strict';
/**
 * @ngInject
 */
var PersonShowController = function ($scope, $controller, $routeParams, Person, User, npdcAppConfig) {

  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = User;

  $scope.personHref = function(uri) {
    if (/api\.npolar\.no/.test(uri)) {
      let id = uri.split('/').slice(-1)[0];
      return `/person/${id}`;
    } else {
      return '';
    }

  };

  let id = $routeParams;

  let show = function(resource, id) {

    let invariants = { fields: "_id,name,systems,groups,active" };
    let query = Object.assign(id, invariants);

    return resource.fetch(query, function(user) {
      if (!user.name) {
        user.name = `${user.first_name} ${user.last_name}`;
        user.active = user.currently_employed;
        user = { name: user.name, active: user.active };
      }
      $scope.document = user;
    });
  };


  if ($scope.security.isAuthorized('read', User.path)) {
    show(User, id).$promise.then(data => {
      npdcAppConfig.cardTitle = data.name;
    });
  } else {

    // Not authorized, switch to the Person API until https://github.com/npolar/api.npolar.no/issues/63
    id = { id: $routeParams.id.split('@')[0] } ;
    show(Person, id);
  }

};

module.exports = PersonShowController;
