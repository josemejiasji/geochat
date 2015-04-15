'use strict';

angular.module('geoChat', ["firebase", "angularGeoFire", "uiGmapgoogle-maps"]);

angular.module('geoChat').config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});

