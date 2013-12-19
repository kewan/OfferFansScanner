'use strict';

angular.module('myApp.controllers', [])
    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
        $scope.slide = '';
        $rootScope.back = function() {
          $scope.slide = 'slide-right';
          $window.history.back();
        }
        $rootScope.go = function(path){
          $scope.slide = 'slide-left';
          $location.url(path);
        }
    }])
    .controller('LoginCtrl', ['$scope', 'Employee', '$http', function ($scope, Employee, $http) {
        // $scope.employees = Employee.query();
        $scope.doLogin = function() {
            $scope.error = {};

            if ( $scope.user === undefined || !$scope.user.username || !$scope.user.password) {
                $scope.error.message = 'Invalid login details';
                return;
            }

            $http.post("http://offerfans.ngrok.com/api/v1/auth/login", $scope.user)
                 .success(function(data, status, headers, config) {
                    window.localStorage.setItem("access_token", data.token);
                    window.localStorage.setItem("username", $scope.user.username);
                    window.location = "#/scan";
                    return true;
                 })
                 .error(function(data, status, headers, config) {
                    $scope.error.message = data.error;
                    window.localStorage.clear();
                    return;
                 });
        }
    }])
    .controller('ScanCtrl', ['$scope', 'Scanner', function ($scope, Scanner) {

        if (!window.localStorage.getItem("access_token")) {
            window.location = "#/login";
            return false;
        }

        $scope.user  = { username: window.localStorage.getItem("username") };

        $scope.scan = function() {
           Scanner.scan(function (result) {
               console.log("Scanner result: \n" +
                    "text: " + result.text + "\n" +
                    "format: " + result.format + "\n" +
                    "cancelled: " + result.cancelled + "\n");

                    if (result.cancelled) {
                        return;
                    }

                    if (!result.text) {
                        $scope.error = "Can not read barcode";
                    }

                    if (result.format != "QR_CODE") {
                        $scope.error = "Unknown barcode format";
                    }

                    $scope.code = result.text;

            }, function (error) { 
                $scope.error = "Scanning failed: " + error;
            });
        }
    }])
    .controller('EmployeeListCtrl', ['$scope', 'Employee', function ($scope, Employee) {
        $scope.employees = Employee.query();
    }])
    .controller('EmployeeDetailCtrl', ['$scope', '$routeParams', 'Employee', function ($scope, $routeParams, Employee) {
        $scope.employee = Employee.get({employeeId: $routeParams.employeeId});
    }])
    .controller('ReportListCtrl', ['$scope', '$routeParams', 'Report', function ($scope, $routeParams, Report) {
        $scope.employees = Report.query({employeeId: $routeParams.employeeId});
    }]);
