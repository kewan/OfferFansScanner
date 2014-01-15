'use strict';

angular.module('myApp.apiService', [])
    .factory('Api', ['$http',
        function ($http) {
          return {
            login: function(user, onSuccess, onFailure) {
              $http.post("http://offerfans.ngrok.com/api/v1/auth/login", user)
                   .success(onSuccess)
                   .error(onFailure);
            },

            redeem: function(code, onSuccess, onFailure) {
              var options = {
                  headers: {
                      'Access-Token' : window.localStorage.getItem("access_token")
                  }
              }

              // put access_token in header
              $http.put("http://offerfans.ngrok.com/api/v1/redeem/"+code, {}, options)
                   .success(onSuccess)
                   .error(onFailure);
            }
          }
        }]);