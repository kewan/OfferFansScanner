'use strict';

angular.module('myApp.scannerService', ['fsCordova'])
    .factory('Scanner', ['CordovaService',
        function (CordovaService) {

            CordovaService.ready.then(function() {
              console.log("cordova is now ready sir");
            });


            return {
              scan: function() {
                console.log("Trying to scan");
              }
            }

        }]);