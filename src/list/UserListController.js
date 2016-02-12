'use strict';

/**
 * @ngInject
 */
let UserListController = function ($scope, $location, $controller, NpolarApiSecurity, npdcAppConfig, User) {

  let security = NpolarApiSecurity;

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = User;

  if (!security.isAuthorized('read', User.path)) {
    return $location.path('/login');
  }

  $scope.users = [];
  $scope.q = '';

  npdcAppConfig.cardTitle = 'npdc.app.Title';

  let search = function (q) {
    User.fetch({ id: '_ids'}, response => {
      $scope.users = response.ids.filter(user => user.indexOf(q) !== -1).sort((a, b) => {
        let aIndex = a.indexOf(q);
        let bIndex = b.indexOf(q);
        if (aIndex < bIndex) {
          return -1;
        } else if (aIndex > bIndex) {
          return 1;
        }
        return 0;
      });
    });
  };

  search('');

  $scope.$watch('q', (newVal, oldVal) => {
    if (newVal !== oldVal) {
      search(newVal);
    }
  });
};

module.exports = UserListController;
