'use strict';

angular.module('myApp.notifyService', ['fsCordova'])
    .factory('Notify', ['CordovaService',
        function (CordovaService) {
          return {
            beep: function() {
              console.log("Beep beeo");
              CordovaService.ready.then(function() {
                navigator.notification.beep(1);
              });
            },
            vibrate: function() {
              console.log("brrrr brbbrbr brbrbr");
              CordovaService.ready.then(function() {
                navigator.notification.vibrate(1000);
              });
            }
          }
        }]);