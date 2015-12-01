'use strict';

/**
 * @ngInject
 */
let UserListController = function ($scope, $location, $controller, NpolarApiMessage, NpolarApiSecurity, User) {
  
  let security = NpolarApiSecurity;

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = User;
  $scope.users = [];
  
  if (security.isAuthorized('read', User.path)) {
    
    User.fetch({ id: '_ids'}, response => {
      $scope.users = response.ids;
    });
    
  } else {
    $location.path('/login');
  }
};

module.exports = UserListController;
