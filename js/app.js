


	angular.module('geoChat', ["firebase","angularGeoFire"]);

	angular.module('geoChat').controller("geoChatController", function($scope, $firebaseObject,$firebaseArray,$geofire) {
		var ref = new Firebase("https://glaring-heat-1935.firebaseio.com");
		var ubicacion = new Firebase("https://glaring-heat-1935.firebaseio.com/ubicacion");
		var obj = $firebaseObject(ubicacion);

		$scope.mensajes=[];
		$scope.user ="Edwin";

		var post={
			latitude:465,
			longitude:045,
			mensaje:{
				user:"",
				texto:"",
				fecha:new Date()
			}

		};

		//Aqui vamos recogiendo los valores
		obj.$watch(function(){
			//Hay que filtral por cordenadas
			$scope.mensajes = [];

			angular.forEach(obj, function(value, key) {
					//$scope.mensajes.;
          console.log(key, value);
          $scope.mensajes.push(value);
       });
		});

		$scope.enviar = function(){
			//Creamos la cordenada en la base de datos
			post.mensaje.user=$scope.user;
			post.mensaje.texto=$scope.message;
			ubicacion.push(post);

		}


	});
