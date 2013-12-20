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
    .controller('LoginCtrl', ['$scope', '$http', function ($scope, $http) {

        if (window.localStorage.getItem("access_token")) {
            window.location = "#/scan";
            return false;
        }

        $scope.doLogin = function() {
            $scope.error = {};
            $scope.loading = true;

            if ( $scope.user === undefined || !$scope.user.username || !$scope.user.password) {
                $scope.error.message = 'Invalid login details';
                $scope.loading = false;
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
                    $scope.loading = false;
                    return;
                 });
        }
    }])
    .controller('ScanCtrl', ['$scope', 'Scanner', '$http', function ($scope, Scanner, $http) {

        if (!window.localStorage.getItem("access_token")) {
            window.location = "#/login";
            return false;
        }

        $scope.user  = { username: window.localStorage.getItem("username") };

        // $scope.claim = {
        //     code: '12345667778999',
        //     customer: {
        //         name: 'Kewan',
        //         picture: 'http://www.placehold.it/50x50'
        //     },
        //     offer: {
        //         title: '2 for 1 on main meals',
        //         image: 'http://www.placehold.it/90x50'
        //     }
        // };

        $scope.scan = function() {
           $scope.error = {};
           $scope.claim = {};
           $scope.loading = true;
           Scanner.scan(onSuccess, onFail);
        }

        var onSuccess = function (result) {
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
                    redeemCode(result.text);
                } else {
                    $scope.error.message = "Can not read barcode";
                }
            }

            if ($scope.error.message) {
                $scope.loading = false;
            }

            $scope.$apply();
        }

        var onFail = function (error) { 
            $scope.error.message = "Scanning failed: " + error;
            $scope.loading = false;
            $scope.$apply();
        }

        var redeemCode = function(code) {

            var options = {
                headers: {
                    'Access-Token' : window.localStorage.getItem("access_token")
                }
            }

            // put access_token in header
            $http.put("http://offerfans.ngrok.com/api/v1/redeem/"+code, {}, options)
                 .success(function(data, status, headers, config) {
                    $scope.claim = data.claim;
                    $scope.loading = false;
                    $scope.$apply();
                 })
                 .error(function(data, status, headers, config) {
                    $scope.error.message = data.error;
                    $scope.loading = false;
                    $scope.$apply();

                    if (status == 401) {
                        //unauthorised invalid token
                        alert(data.error);
                        window.localStorage.clear();
                        window.location = "#/login";
                        return false;
                    }

                 });

        }
    }]);
