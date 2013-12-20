'use strict';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'myApp.controllers',
    'myApp.directives',
    'fsCordova',
    'myApp.scannerService'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
    $routeProvider.when('/scan', {templateUrl: 'partials/scan.html', controller: 'ScanCtrl'});
    $routeProvider.otherwise({redirectTo: '/scan'});
}]);