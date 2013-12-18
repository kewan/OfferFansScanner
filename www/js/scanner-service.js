'use strict';

angular.module('myApp.scannerService', ['fsCordova'])
    .factory('Scanner', ['CordovaService',
        function (CordovaService) {
            return {
              scan: function() {
         
                CordovaService.ready.then(function() {

                  var scanner = cordova.require("cordova/plugin/BarcodeScanner");

                  scanner.scan( function (result) { 

                     console.log("Scanner result: \n" +
                          "text: " + result.text + "\n" +
                          "format: " + result.format + "\n" +
                          "cancelled: " + result.cancelled + "\n");

                      // if result.cancelled {
                      //     return;
                      // }

                      // if (!result.text) {
                      //     response.error = "Can not read barcode";
                      //     return;
                      // }

                      // if (args.format != "QR_CODE") {
                      //     response.error = "Unknown barcode format";
                      //     return;
                      // }                      

                  }, function (error) { 
                      console.log("Scanning failed: ", error);
                  } );

                });
              }
            }

        }]);