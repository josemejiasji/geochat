angular.module('geoChat')
    .controller('geoMapController', ['$scope', function($scope) {

        $scope.init = function() {
        	$scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 1 };
        	$scope.userMarker = { id: 0, coords: { latitude: 0, longitude: 0 } };
            $scope.getUserCurrentLocation();
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
                    latitude: position.latitude,
                    longitude: position.longitude
                },
                zoom: 17
            };

            $scope.userMarker = {
                id: 0,
                coords: {
                    latitude: position.latitude,
                    longitude: position.longitude
                }
            };
        };

    }]);
