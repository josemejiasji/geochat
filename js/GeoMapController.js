angular.module('geoChat')
    .controller('GeoMapController', ['$scope', '$firebaseObject','$geofire','uiGmapGoogleMapApi',
        function($scope, $firebaseObject,$geofire,uiGmapGoogleMapApi) {

        $scope.init = function() {

            // inicializar el mapa a 0
            $scope.map = {
                center: {
                    latitude: 0,
                    longitude: 0
                },
                bound:{},
                zoom: 1
            };

            $scope.coords = {};

            // cargar coordenadas del usuario
            $scope.getUserCurrentLocation();

            $scope.user = [];

            $scope.userMarkers = [];

            $scope.circles = [];

        };

        // uiGmapGoogleMapApi is a promise.
        // The "then" callback function provides the google.maps object.
        uiGmapGoogleMapApi.then(function(maps) {
            //console.log(maps);
        });



        $scope.getUserCurrentLocation = function() {
            if (!navigator.geolocation) {
                console.log('Geolocation not supported');
            }

            function success(position) {
                var coords = {};
                coords.latitude = position.coords.latitude;
                coords.longitude = position.coords.longitude;

                $scope.loadMap(coords);

                $scope.$root.userCoords = coords;
                $scope.coords = coords;
                return coords;
            }

            function error(reason) {
                console.log(error);
            }

            navigator.geolocation.getCurrentPosition(success, error);
        };



        $scope.loadMap = function(position) {
            $scope.map = {
                center: {
                    latitude: parseFloat(position.latitude),
                    longitude: parseFloat(position.longitude)
                },
                zoom: 17
            };

            $scope.userMarker = {
                center: {
                    latitude: parseFloat(position.latitude),
                    longitude: parseFloat(position.longitude)
                }
            };

            var usuarios = new Firebase("https://glaring-heat-1935.firebaseio.com/usuarios"),
                users    = new GeoFire(usuarios),
                obj      = $firebaseObject(usuarios);

                //Actualiza los datos cuando hay cambios
                obj.$watch(function(){

                    angular.forEach(obj, function(value, key) {

                        var color     = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}),
                            objCircle = {
                                id: key,
                                center: {
                                    latitude: value.l[0],
                                    longitude: value.l[1]
                                },
                                radius: 130,
                                stroke: {
                                    color: color,
                                    weight: 2,
                                    opacity: 0.7
                                },
                                fill: {
                                    color: color,
                                    opacity: 0.3
                                },
                                geodesic: true, // optional: defaults to false
                                draggable: false, // optional: defaults to false
                                clickable: true, // optional: defaults to true
                                editable: false, // optional: defaults to false
                                visible: true, // optional: defaults to true
                                control: {}
                            };

                        $scope.circles.push(objCircle);

                        $scope.userMarkers.push({
                                id:value.l[0] +""+value.l[1],
                                latitude: value.l[0],
                                longitude: value.l[1],
                                title:key
                        });
                    });

                });

                //Nuevo usuario
                users.set($scope.$root.usuario,[position.latitude,position.longitude]);


        };


        // //Aqui vamos recogiendo los valores
        // $scope.$watch('users', function() {

        //     angular.forEach($scope.users, function(value, key) {
        //         //$scope.mensajes.;
        //         console.log(key, value);
        //         var marker = new google.maps.Marker({
        //         	position: {latitude: 0, longitude: 0},
        //         	map: $scope.map
        //         });
        //     });
        // });

    }]);
