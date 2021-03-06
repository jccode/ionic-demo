
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
        $scope.demos = ['Toast Plugin', 'Barcode Scanner Plugin', 'SVG', 'Local Notification Plugin', 'Bluetooth',
                       'File API'];
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


    .controller('SVGDemoCtrl', ['$scope', '$window', '$filter', '$timeout', '$ionicSideMenuDelegate', '$ionicPopup', function($scope, $window, $filter, $timeout, $ionicSideMenuDelegate, $ionicPopup) {
        
        $scope.msgs = [];
        
        // console.log($window.innerWidth + ", " + $window.innerHeight);
        
        var margin = {top: -5, right: -5, bottom: -5, left: -5},
            width = $window.innerWidth - margin.left - margin.right,
            height = $window.innerHeight / 2 - margin.top - margin.bottom;

        var zoom = d3.behavior.zoom()
                .scaleExtent([1, 10])
                .on('zoomstart', zoomstarted)
                .on('zoom', zoomed)
                .on('zoomend', zoomended);

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
        d3.xml('templates/demo/demo-plan2.svg', 'image/svg+xml', function(xml) {
            innersvg = container.append('g')
                .append(function() {
                    return xml.documentElement;
                });

            innersvgLoaded();
        });


        function zoomstarted() {
            // d3.event.sourceEvent.stopPropagation();
            // console.log(d3.event.sourceEvent);
            $ionicSideMenuDelegate.canDragContent(false);
        }

        function zoomended() {
            $ionicSideMenuDelegate.canDragContent(true);
        }

        function zoomed() {
            container.attr("transform", "translate("+ d3.event.translate +") scale("+ d3.event.scale +")");
        }

        // init when inner svg loaded
        function innersvgLoaded() {

            // init seat state, add click event
            innersvg.selectAll(".seat")
                .classed('green', true)
                .on('touch', function() {

                    // $scope.$apply(function() {
                    //     var p = '[' + $filter('date')(new Date, 'HH:mm:ss.sss') + '] ';
                    //     $scope.msgs.push(p + 'rect is clicked.');
                    //     $timeout(function() {
                    //         $scope.msgs.splice(0, 1);
                    //     }, 3000);
                    // });

                    var el = d3.select(this);
                    var seat = el.attr('data-seat');
                    var msg; 
                    if( el.classed('green') ){
                        el.classed({
                            'red': true,
                            'green': false
                        });
                        
                        msg = 'Seat ' + seat + ' was reserved for you!';
                    } else {
                        msg = "Here we'll show the user profile who taken the seat " + seat;
                    }

                    var alertPopup = $ionicPopup.alert({
                        title: "Infomation",
                        template: msg
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
        $scope.toggleRectColor = function () {
            innersvg.selectAll('.seat')
                .classed('red', false)
                .classed('green', true);
        };
        
    }])

    .controller('LocalNotificationDemoCtrl', ['$scope', function($scope) {
        var ID1 = "1";
        
        $scope.notifyNow = function () {
            window.plugin.notification.local.add({
                id: ID1,
                title: 'Reminder',
                message: 'This is the first notification. '
            });
        };

        $scope.notify = function (second) {
            var now = +new Date();
            window.plugin.notification.local.add({
                id: now,
                title: 'A delay notification',
                date: new Date(now + second*1000),
                message: 'Ah ha, the second notification. ' + now
            });
        };

        $scope.cancel = function () {
            window.plugin.notification.local.cancel(ID1);
        };

        $scope.cancelAll = function () {
            window.plugin.notification.local.cancelAll();
        };

        
    }])

    .controller('BluetoothDemoCtrl', ['$scope', '$window', function($scope, $window) {
        function showMsg(msg) {
            $window.plugins.toast.showShortBottom(msg);
        }

        $scope.checkIfBluetoothEnable = function() {
            bluetoothSerial.isEnabled(function() {
                showMsg("Bluetooth is enabled.");
            }, function() {
                showMsg("Bluetooth is not enabled.");                
            });
        }
        $scope.listPairedDevices = function() {
            bluetoothSerial.list(function(data) {
                showMsg(data);
            }, function(e) {
                showMsg('Request failed. ' + e);
            });
        }

        function leErrorCallback(e) {
            showMsg('Bluetooth request failded. type: ' + e["error"] + " error msg: " + e["message"]);
        }

        
        $scope.leIsEnabled = function() {
            bluetoothle.isEnabled(function(ret) {
                showMsg('Bluetooth is' + ret?' ':' not ' + "enabled");
            });
        }
        $scope.leIsInitialize = function() {
            bluetoothle.isInitialized(function(data) {
                var ret = data['isInitialized'];
                showMsg('Bluetooth is' + ret?' ':' not ' + "initialize");
            });
        }
        $scope.leInitialize = function() {
            bluetoothle.initialize(function(data) {
                var ret = data['status'] == 'enabled';
                if(ret) {
                    showMsg('Bluetooth initialize successful')
                } else {
                    showMsg('Bluetooth initialize failed. status: ' + data['status'])
                }
            }, leErrorCallback, {'request': true});
        }
        $scope.leStartScan = function() {
            bluetoothle.startScan(function(data) {
                var status = data['status'];
                if(status == 'scanStarted') {
                    showMsg('Bluetooth scan started ...');
                }
                else if(status == 'scanResult') {
                    showMsg('Find device ' + data['name'] + ', address: ' + data['address']);
                }
                else {
                    showMsg("Bluetooth successful callback");
                }
            }, leErrorCallback, null);
        }
        $scope.leStopScan = function() {
            bluetoothle.stopScan(function(data) {
                var status = data['status'];
                if(status == 'scanStopped') {
                    showMsg('Bluetooth scan stopped');
                }
                else {
                    showMsg('Bluetooth stopScan callback');
                }
            }, leErrorCallback);
        }
        $scope.leClose = function() {
            bluetoothle.close(function(data) {
                var status = data['status'];
                if(status == 'closed') {
                    showMsg('Bluetooth closed.');
                } else {
                    showMsg('bluetooth close callback');
                }
            }, leErrorCallback);
        }

    }])

    .controller('FileAPIDemoCtrl', ['$scope', '$window', 'Users', 'FileUtil', '_', function($scope, $window, Users, FileUtil, _) {

        var baseurl = 'https://www.nweapp.nl/hnw';
        var DATADIR, knownfiles = [];
        
        

        function getName(path) {
            return path.replace(/.*\/(\w+\.(jpg|png))/ig, '$1');
        }

        function onError(e) {
            console.log( "ERROR" );
            console.log( JSON.stringify(e) );
        }

        function onFSSuccess(fileSystem) {
            fileSystem.root.getDirectory("Android/data/tk.jcchen.ionic-demo", {create: true}, gotDir, onError);
        }

        function gotDir(d) {
            DATADIR = d;
            var reader = DATADIR.createReader();
            reader.readEntries(function(d) {
                gotFiles(d);
                downloadFiles();
            }, onError);
        }

        function gotFiles(entries) {
            console.log("The dir has " + entries.length + " entries.");
            _.each(entries, function(e) {
                knownfiles.push(e.name);
                // $scope.pics.push(e.fullPath);
                $scope.pics.push(e.toURL());
            });
            $scope.$apply();
        }

        function downloadFiles() {
            Users.all().$promise.then(function(users) {
                var pics = _.map(users, function(user) {
                    return user.UserPic;
                });

                _.each(pics, function(picurl) {
                    var name = getName(picurl);
                    if(!_.contains(knownfiles, name)) {
                        console.log('need to download ' + name);
                        var ft = new FileTransfer();
                        var dlPath = DATADIR.toURL() + "/" + name;
                        ft.download(baseurl + escape(picurl), dlPath, function(e) {
                            // $scope.pics.push(dlPath);
                            $scope.pics.push(e.toURL());
                            console.log("download " + name + " successful. " + dlPath);
                            $scope.$apply();
                        }, onError);
                    }
                });
            });
        }



        
        $scope.fuck = function () {
            console.log('fuck.......');
            $scope.pics = [];
            $window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, null);
            console.log('endd.......');
        };

    }])

;


