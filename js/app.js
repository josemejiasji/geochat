
	'use strict';

	angular.module('geoChat', ["firebase","angularGeoFire"]);

	angular.module('geoChat').controller("geoChatController", function($scope, $firebaseObject,$firebaseArray,$geofire) {
		var ref = new Firebase("https://glaring-heat-1935.firebaseio.com");
		var obj = $firebaseObject(ref);
		$scope.mensajes=[];

		obj.$loaded().then(function() {
        console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

       // To iterate the key/value pairs of the object, use angular.forEach()
       angular.forEach(obj, function(value, key) {
          console.log(key, value);

       });
     });

		obj.$watch(function(){
			console.log("cambio")
			angular.forEach(obj, function(value, key) {
          $scope.mensajes.push(value)
       });
		});

		$scope.enviar = function(){
			//Se debe de pillar la ubicacion en la que se hizo el mensaje
			ref.push({
				user:$scope.user,
				mensaje:$scope.message
			})
		}


	});
