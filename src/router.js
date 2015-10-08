'use strict';

/**
 * @ngInject
 */
var router = function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider.when('/register', {
    template: require('./register/register-user.html'),
    controller: 'UserRegisterController'
  }).when('/confirm/:id', {
    template: require('./register/confirm.html'),
    controller: 'UserRegisterController'
  }).when('/:id', {
    template: require('./show/show-user.html'),
    controller: 'UserShowController'
  }).when('/:id/edit', {
    template: '<npdc:formula></npdc:formula>',
    controller: 'UserEditController'
  }).when('/', {
    template: require('./list/users.html'),
    controller: 'UserListController'
  });
};

module.exports = router;
