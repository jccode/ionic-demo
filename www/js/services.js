
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
        
    })

    .factory('Users', ['$resource', function($resource) {
        var url = 'https://www.nweapp.nl/hnwapi/api/user',
            resource = $resource(url);

        return {
            all: function() {
                return resource.query();
            },

            allPics: function() {
                return resource.query(function(rets) {
                    return _.map(function(el) {
                        return el.UserPic;
                    }, rets);
                });
            }


        };
    }])
;
