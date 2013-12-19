'use strict';

angular.module('myApp.scannerService', ['fsCordova'])
    .factory('Scanner', ['CordovaService',
        function (CordovaService) {
          return {
            scan: function() {

              return CordovaService.ready.then(function() {

                var scanner = cordova.require("cordova/plugin/BarcodeScanner");

                return scanner.scan( function (result) { 

                   console.log("Scanner result: \n" +
                        "text: " + result.text + "\n" +
                        "format: " + result.format + "\n" +
                        "cancelled: " + result.cancelled + "\n");

                    if (result.cancelled) {
                        return {};
                    }

                    if (!result.text) {
                        return { error: "Can not read barcode"};
                    }

                    if (result.format != "QR_CODE") {
                        return { error: "Unknown barcode format" };
                    }

                    return { code: result.text };

                }, function (error) { 
                  return { error: "Scanning failed: " + error };
                } );

              });
            }
          }
        }]);