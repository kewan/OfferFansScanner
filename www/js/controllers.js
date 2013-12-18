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
                    console.log(data);
                    console.log(status);
                    console.log(headers);
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
    .controller('ScanCtrl', ['$scope', 'CordovaService', function ($scope, CordovaService) {

        if (!window.localStorage.getItem("access_token")) {
            window.location = "#/login";
            return false;
        }

        $scope.user  = { username: window.localStorage.getItem("username") };

        CordovaService.ready.then(function() {
          console.log("cordova is now ready sir");
        });

        $scope.scan = function() {
            var scanner = cordova.require("cordova/plugin/BarcodeScanner");

            scanner.scan( function (result) { 

                alert("We got a barcode\n" + 
                "Result: " + result.text + "\n" + 
                "Format: " + result.format + "\n" + 
                "Cancelled: " + result.cancelled);  

               console.log("Scanner result: \n" +
                    "text: " + result.text + "\n" +
                    "format: " + result.format + "\n" +
                    "cancelled: " + result.cancelled + "\n");
                document.getElementById("info").innerHTML = result.text;
                console.log(result);
                /*
                if (args.format == "QR_CODE") {
                    window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
                }
                */

            }, function (error) { 
                console.log("Scanning failed: ", error); 
            } );
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
