angular.module('geoChat').controller("geoChatController", function($scope, $firebaseObject, $firebaseArray, $geofire) {


    var ref = new Firebase("https://glaring-heat-1935.firebaseio.com"),
        historial = new Firebase("https://glaring-heat-1935.firebaseio.com/historial"),
        obj = $firebaseObject(historial),
        f = new Date(),
        post = {
            coords:{
                latitude: 0,
                longitude: 0
            },

            mensaje: {
                user: "",
                texto: "",
                fecha: f.toDateString()
            }
        };
    $scope.$root.userCoords={};
    $scope.mensajes = [];

    //Aqui vamos recogiendo los valores
    obj.$watch(function() {
        //Hay que filtral por cordenadas
        $scope.mensajes = [];

        angular.forEach(obj, function(value, key) {
            //$scope.mensajes.;
            console.log(key, value);
            $scope.mensajes.push(value);
        });
    });

    $scope.enviar = function() {
        //Creamos la cordenada en la base de datos
        post.coords = $scope.$root.userCoords;
        post.mensaje.user = $scope.user;
        post.mensaje.texto = $scope.message;
        historial.push(post);
    }

});