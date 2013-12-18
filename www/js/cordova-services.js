'use strict';

angular.module('myApp.cordovaServices', [])
    .factory('cordovaReady', [function () {
        return function (fn) {

            console.log("cardovaReady Service");
            var queue = [],
                impl = function () {
                    queue.push([].slice.call(arguments));
                };

            document.addEventListener('deviceready', function () {
                console.log("device is ready");
                queue.forEach(function (args) {
                    fn.apply(this, args);
                });
                impl = fn;
            }, false);

            return function () {
                return impl.apply(this, arguments);
            };
        };
    }]);