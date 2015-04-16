angular.module('geoChat').controller("geoChatController", function($scope, $firebaseObject, $firebaseArray, $geofire) {

    $scope.init = function(){
        $scope.historialDb = new Firebase("https://glaring-heat-1935.firebaseio.com/historial");
        //$scope.$root.userCoords={};
        $scope.mensajes = [];

        var historialDbObj = $firebaseObject($scope.historialDb),
            f = new Date();

        $scope.post = {
            coords:{
                latitude: 0,
                longitude: 0
            },

            mensaje: {
                user: $scope.$root.usuario,
                texto: "",
                fecha: f.toDateString()
            }
        };

        //Aqui vamos recogiendo los valores
        historialDbObj.$watch(function() {
            //Hay que filtral por cordenadas
            $scope.mensajes = [];

            angular.forEach(historialDbObj, function(value, key) {
                $scope.mensajes.push(value);
            });

            console.log($scope.mensajes);
        });
    };

    $scope.enviar = function() {
        //Creamos la cordenada en la base de datos
        $scope.post.coords = $scope.$root.userCoords;
        $scope.post.mensaje.texto = $scope.message;
        $scope.historialDb.push($scope.post);
    };

});