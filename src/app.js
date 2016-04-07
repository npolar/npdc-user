'use strict';

var npdcCommon = require('npdc-common');
var AutoConfig = npdcCommon.AutoConfig;

var angular = require('angular');

var npdcPersonApp = angular.module('npdcPersonApp', ['npdcCommon']);

npdcPersonApp.controller('UserShowController', require('./show/UserShowController'));
npdcPersonApp.controller('UserListController', require('./list/UserListController'));
npdcPersonApp.controller('UserEditController', require('./edit/UserEditController'));
npdcPersonApp.controller('UserLoginController', require('./login/UserLoginController'));
npdcPersonApp.controller('UserRegisterController', require('./register/UserRegisterController'));
npdcPersonApp.controller('UserResetController', require('./reset/UserResetController'));
npdcPersonApp.controller('UserUpdateController', require('./update/UserUpdateController'));

// Bootstrap ngResource models using NpolarApiResource
var resources = [
  {'path': '/user', 'resource': 'User'},
  {'path': '/person', 'resource': 'Person'}
];

resources.forEach(service => {
  // Expressive DI syntax is needed here
  npdcPersonApp.factory(service.resource, ['NpolarApiResource', function (NpolarApiResource) {
    return NpolarApiResource.resource(service);
  }]);
});

npdcPersonApp.config(($httpProvider, npolarApiConfig) => {
  var environment = 'production';
  var autoconfig = new AutoConfig(environment);
  angular.extend(npolarApiConfig, autoconfig, { resources });

  // API HTTP interceptor
  $httpProvider.interceptors.push('npolarApiInterceptor');
});

// Routing
npdcPersonApp.config(require('./router'));

// Inject npolarApiConfig and run
npdcPersonApp.run(NpolarTranslate => {
  NpolarTranslate.loadBundles('npdc-user');
});
