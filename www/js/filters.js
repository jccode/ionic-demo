
angular.module('starter.filters', [])
    .filter('normalize', function() {
        return function(input) {
            return input.replace(/\s+/g, '-').toLowerCase();
        };

    });

