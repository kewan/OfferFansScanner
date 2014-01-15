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
        $rootScope.logout = function() {
            window.localStorage.clear();
            window.location = "#/login";
            return false;
        }
    }])
    .controller('LoginCtrl', ['$scope', 'Api', 'Notify', function ($scope, Api, Notify) {

        if (window.localStorage.getItem("access_token")) {
            window.location = "#/scan";
            return false;
        }

        $scope.doLogin = function() {
            $scope.error = {};
            $scope.loading = true;

            if ( $scope.user === undefined || !$scope.user.username || !$scope.user.password) {
                $scope.error.message = 'Invalid login details';
                Notify.vibrate();
                $scope.loading = false;
                return;
            }
            Api.login($scope.user, loginSuccess, loginError);
        }

        var loginSuccess = function(data, status, headers, config) {
            window.localStorage.setItem("access_token", data.token);
            window.localStorage.setItem("username", $scope.user.username);
            window.location = "#/scan";
         };

        var loginError = function(data, status, headers, config) {
            $scope.error.message = data.error;
            Notify.vibrate();
            window.localStorage.clear();
            $scope.loading = false;
         };
    }])
    .controller('ScanCtrl', ['$scope', 'Scanner', 'Notify', 'Api', function ($scope, Scanner, Notify, Api) {

        if (!window.localStorage.getItem("access_token")) {
            window.location = "#/login";
            return false;
        }

        $scope.user  = { username: window.localStorage.getItem("username") };

        $scope.scan = function() {
           $scope.error = {};
           $scope.claim = {};
           $scope.loading = true;
           Scanner.scan(scanSuccess, scanFailure);
        }

        var scanSuccess = function (result) {
           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");

            if (result.cancelled) {
                $scope.error.message = "Cancelled";
            } else if (result.format != "QR_CODE") {
                $scope.error.message = "Unknown barcode format";
            } else {
                if (result.text) {
                    Api.redeem(result.text, redeemSuccess, redeemFailure);
                } else {
                    $scope.error.message = "Can not read barcode";
                }
            }

            if ($scope.error.message) {
                Notify.vibrate();
                $scope.loading = false;
            }

            $scope.$apply();
        }

        var scanFailure = function (error) { 
            $scope.error.message = "Scanning failed: " + error;
            $scope.loading = false;
            Notify.vibrate();
            $scope.$apply();
        }

        var redeemSuccess = function(data, status, headers, config) {
            $scope.claim = data.claim;
            $scope.loading = false;
            Notify.beep();
            $scope.$apply();
         }

         var redeemFailure = function(data, status, headers, config) {
             $scope.error.message = data.error;
             $scope.loading = false;
             Notify.vibrate();
             $scope.$apply();
             if (status == 401) {
                 //unauthorised invalid token
                 alert(data.error);
                 window.localStorage.clear();
                 window.location = "#/login";
             }
          }
    }]);
