'use strict';

var environment = require('../environment');
var npdcCommon = require('npdc-common');
var AutoConfig = npdcCommon.AutoConfig;

var angular = require('angular');
require('formula');
require('angular-route');
require('angular-npolar');

var npdcPersonApp = angular.module('npdcPersonApp', ['ngRoute', 'formula', 'npolarApi', 'npolarUi', 'npdcUi', 'templates']);

npdcPersonApp.controller('UserShowController', require('./show/UserShowController'));
npdcPersonApp.controller('UserListController', require('./list/UserListController'));
npdcPersonApp.controller('UserEditController', require('./edit/UserEditController'));

// Bootstrap ngResource models using NpolarApiResource
var resources = [
  {'path': '/user', 'resource': 'User'},
  {'path': '/person', 'resource': 'Person'},
];

resources.forEach(service => {
  // Expressive DI syntax is needed here
  npdcPersonApp.factory(service.resource, ['NpolarApiResource', function (NpolarApiResource) {
    return NpolarApiResource.resource(service);
  }]);
});

// Routing
npdcPersonApp.config(require('./router'));

// API HTTP interceptor
npdcPersonApp.config($httpProvider => {
  $httpProvider.interceptors.push('npolarApiInterceptor');
});

// Inject npolarApiConfig and run
npdcPersonApp.run(npolarApiConfig => {
  var autoconfig = new AutoConfig(environment);
  angular.extend(npolarApiConfig, autoconfig, { resources, formula : { template : 'material' } });
  console.log("npolarApiConfig", npolarApiConfig);
});
