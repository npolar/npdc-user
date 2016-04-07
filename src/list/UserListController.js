'use strict';

/**
 * @ngInject
 */
let UserListController = function ($scope, $location, $controller, Person) {


  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = Person;
  $scope.searchOptions = {
    results: {
      title(e) {
        return e.first_name + ' ' + e.last_name;
      },
      subtitle: 'email',
      detail: 'workplace',
      href: 'email'
  }};

  if (!$scope.security.isAuthorized('read', Person.path)) {
    return $location.path('/login');
  }

  $scope.search();

  $scope.$on('$locationChangeSuccess', (event, data) => {
    $scope.search();
  });
};

module.exports = UserListController;
