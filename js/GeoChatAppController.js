angular.module('geoChat').controller("geoChatAppController",
	function($scope, $firebaseObject, $firebaseArray, $geofire) {
		$scope.logged=false;

		$scope.entrar= function(val){
			$scope.$root.usuario = val;
			$scope.logged=true;
		};
});