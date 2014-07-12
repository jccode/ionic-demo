
angular.module('starter.home', ['ionic'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app.home.index', {
                url: "",
                views: {
                    'home-tab-index': {
                        templateUrl: "templates/home/tab-index.html"
                    }
                }
            })

            .state('app.home.friends', {
                url: "/friends",
                views: {
                    'home-tab-friends': {
                        templateUrl: "templates/home/tab-friends.html", 
                        controller: 'FriendsCtrl'
                    }
                }
            })

            .state('app.home.friend-detail', {
                url: "/friend/:friendId",
                views: {
                    'home-tab-friends': {
                        templateUrl: "templates/home/friend-detail.html",
                        controller: 'FriendDetailCtrl'
                    }
                }
            })

            .state('app.home.account', {
                url: "/account",
                views: {
                    'home-tab-account': {
                        templateUrl: "templates/home/tab-account.html"
                    }
                }
            })

    }
)
