angular.module('geoChat').controller("geoChatAppController",
	function($scope, $firebaseObject, $firebaseArray, $geofire) {
		$scope.logged=false;

		$scope.entrar= function(usuario){
			var usuarios = new Firebase("https://glaring-heat-1935.firebaseio.com/usuarios"),
          users    = new GeoFire(usuarios),
          obj      = $firebaseObject(usuarios);

      users.get(usuario).then(function(location) {
			  if (location === null) {
			    console.log("Provided key is not in GeoFire");
			  }
			  else {
			  	//Si existe mirar si esta conectado
			    console.log("Provided key has a location of " + location);
			  }
			}, function(error) {
			  console.log("Error: " + error);
			});

			$scope.$root.usuario = usuario;
			//$scope.logged=true;
		};
});