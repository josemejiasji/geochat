angular.module('geoChat')
    .controller('GeoMapController', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {

        $scope.init = function() {
            // inicializar el mapa a 0
            $scope.map = {
                center: {
                    latitude: 0,
                    longitude: 0
                },
                zoom: 1
            };

            // cargar coordenadas del usuario
            $scope.getUserCurrentLocation();

            $scope.users={};
        };

        $scope.getUserCurrentLocation = function() {
            if (!navigator.geolocation) {
                console.log('Geolocation not supported');
            }

            function success(position) {
                var coords = {};
                coords.latitude = position.coords.latitude;
                coords.longitude = position.coords.longitude;

                $scope.loadMap(coords);

                var usuarios = new Firebase("https://glaring-heat-1935.firebaseio.com/usuarios");
                usuarios.push(coords);

                $scope.users = $firebaseObject(usuarios);

                $scope.$root.userCoords = coords;
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
        };

        //Aqui vamos recogiendo los valores
        $scope.$watch('users', function() {

            angular.forEach($scope.users, function(value, key) {
                //$scope.mensajes.;
                console.log(key, value);
                var marker = new google.maps.Marker({
                	position: {latitude: 0, longitude: 0},
                	map: $scope.map
                });
            });
        });

    }]);
