angular.module('geoChat', ["firebase","angularGeoFire", "uiGmapgoogle-maps"]);

angular.module('geoChat').controller("geoChatController", function($scope, $firebaseObject,$geofire) {
	var ref = new Firebase("https://glaring-heat-1935.firebaseio.com/");

	//Cojemos el data
	$scope.data = $firebaseObject(ref);

});