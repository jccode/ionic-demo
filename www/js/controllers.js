
angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        $scope.hasLogin = false;
        

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        },

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);
            $scope.hasLogin = true;

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('PlaylistsCtrl', function($scope) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    })

    .controller('PlaylistCtrl', function($scope, $stateParams) {
    })

    .controller('FriendsCtrl', ['$scope', 'Friends', function($scope, Friends) {
        $scope.friends = Friends.all()
    }])

    .controller('FriendDetailCtrl', ['$scope', '$stateParams','Friends', function($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    }])

    .controller('DemosCtrl', ['$scope', function($scope) {
        $scope.demos = ['Toast Plugin', 'Barcode Scanner Plugin', 'SVG'];
    }])

    .controller('BarcodeDemoCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.isError = false;
        $scope.scanBarcode = function () {
            
            cordova.plugins.barcodeScanner.scan(function(result) {
                $scope.$apply(function() {
                    $scope.result = result;
                    $scope.error = false;
                });
                
            }, function(error) {
                $scope.$apply(function() {
                    $scope.error = error;
                    $scope.result = false;
                });
            });

            /*
            $scope.result = {
                text: "hello world.",
                format: "QR-code",
                cancelled: true
            }; 
             */
        };
    }])

    .controller('SVGDemoCtrl', ['$scope', '$window', '$ionicPopup', function($scope, $window, $ionicPopup) {

        // console.log($window.innerWidth + ", " + $window.innerHeight);
        
        var margin = {top: -5, right: -5, bottom: -5, left: -5},
            width = $window.innerWidth - margin.left - margin.right,
            height = $window.innerHeight / 2 - margin.top - margin.bottom;

        var zoom = d3.behavior.zoom()
                .scaleExtent([1, 10])
                .on('zoomstart', zoomstarted)
                .on('zoom', zoomed);

        var svg = d3.select("#svg-wrapper").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.right + ")" )
                .call(zoom);

        var rect = svg.append("rect")
                .attr('width', width)
                .attr('height', height)
                .style('fill', 'none')
                .style('pointer-events', 'all');

        var container = svg.append('g');

        var innersvg; 
        d3.xml('templates/demo/demo-plan.svg', 'image/svg+xml', function(xml) {
            innersvg = container.append('g')
                .append(function() {
                    return xml.documentElement;
                });

            innersvgLoaded();
        });

        function zoomstarted() {
            d3.event.sourceEvent.stopPropagation();
        }


        function zoomed() {
            container.attr("transform", "translate("+ d3.event.translate +") scale("+ d3.event.scale +")");
        }

        // init when inner svg loaded
        function innersvgLoaded() {
            // svg click event
            innersvg.selectAll('rect').on('mousedown', function() {
                var alertPopup = $ionicPopup.alert({
                    title: "Infomation",
                    template: "Here can show some more detail informations"
                });
                alertPopup.then(function(res) {
                    // Here can put some code to do some stuff after the popup closed.
                });
            });
        }

        // register a resize handler
        $window.onresize = function() {
            $scope.$apply(function() {
                width = $window.innerWidth - margin.left - margin.right;
                height = $window.innerHeight / 2 - margin.top - margin.bottom;
                d3.select("#svg-wrapper").select("svg")
                    .attr({
                        'width': width + margin.left + margin.right,
                        'height': height + margin.top + margin.bottom
                    })
                    .select('rect')
                    .attr({
                        'width': width,
                        'height': height
                    });
                // console.log('resized');
            });
        }
        

        // toggle color
        var counter = 0, 
            colors = ['blue', 'red', 'white'];
        $scope.toggleRectColor = function () {
            innersvg.selectAll('rect').style('fill', colors[ ++counter % 3 ]);
        };
        
    }])

;
