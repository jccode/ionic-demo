// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.filters', 'starter.home'])

    .run(function($rootScope, $ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });


        // press back button to exit
        /*
        $ionicPlatform.registerBackButtonAction(function(e){
            if ($rootScope.backButtonPressedOnceToExit) {
                ionic.Platform.exitApp();
            }
            else if ($rootScope.$viewHistory.backView) {
                $rootScope.$viewHistory.backView.go();
            }
            else {
                $rootScope.backButtonPressedOnceToExit = true;
                window.plugins.toast.showShortCenter(
                    "Press back button again to exit",function(a){},function(b){}
                );
                setTimeout(function(){
                    $rootScope.backButtonPressedOnceToExit = false;
                },2000);
            }
            e.preventDefault();
            return false;
        }, 101);
        */
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.home', {
                url: "/home",
                abstract: true, 
                views: {
                    'menuContent' :{
                        templateUrl: "templates/home/home.html"
                    }
                }
            })        

            .state('app.demos', {
                url: "/demos",
                views: {
                    'menuContent': {
                        templateUrl: "templates/demos.html",
                        controller: "DemosCtrl"
                    }
                }
            })

            .state('app.demo-detail', {
                url: "/demo/:name",
                views: {
                    'menuContent': {
                        templateUrl: function($stateParams) {
                            var name = $stateParams.name;
                            // name = name.replace(/\s+/g, '-').toLowerCase();
                            return 'templates/demo/' + name + ".html"
                        }
                    }
                }
            })
        
            .state('app.browse', {
                url: "/browse",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/browse.html"
                    }
                }
            })

            .state('app.music', {
                url: "/music",
                views: {
                    'menuContent': {
                        templateUrl: "templates/music.html"
                    }
                }
            })

            .state('app.music.content', {
                url: "/content",
                views: {
                    "music-content": {
                        // templateUrl: "templates/music-content.html"
                        template: "<h3>music-content</h3>"
                    }
                }
            })
        
            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/playlists.html",
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/playlist.html",
                        controller: 'PlaylistCtrl'
                    }
                }
            });
        
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/playlists');
    });

