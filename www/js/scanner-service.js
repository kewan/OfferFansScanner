'use strict';

function KewScan(CardovaService) {

  CordovaService.ready.then(function() {
    this.scanner = cordova.require("cordova/plugin/BarcodeScanner");

    this.scan = function() {
      return this.scanner.scan(function(result) {
        if (result.cancelled) {
          return {};
        }

        if (!result.text) {
          return { error: 'Can not read code' };
        }

        if(result.format != "QR_CODE") {
          return { error: "Unknown barcode format" };
        }

        return { code: result.text };

      }, function(error) {
        return { error: "Scanning failed: " + error};
      })
    }

  });

}

/*
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
*/

angular.module('myApp.scannerService', ['fsCordova'])
    .factory('Scanner', ['CordovaService',
        function (CordovaService) {
          return new KewScan(CardovaService);
        }]);