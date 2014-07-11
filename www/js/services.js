
angular.module('starter.services', [])

    .factory('Friends', function() {

        var friends = [
            { id: 0, name: 'Scrott' }, 
            { id: 1, name: 'Tigger' }, 
            { id: 2, name: 'Miss Frizzle' }, 
            { id: 3, name: 'Ash Ketchum' }, 
        ];

        return {
            all: function() {
                return friends;
            },
            
            get: function(friendId) {
                return friends[friendId];
            }
        };
        
    });
