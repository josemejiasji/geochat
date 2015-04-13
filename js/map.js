window.onload = function(){
	if (!navigator.geolocation) {
		console.log('Geolocation not supported');
	} 

	function success(position) {
		var pos = {};
		pos.latitude = position.coords.latitude;
		pos.longitude = position.coords.longitude;

		return pos;
	}

	function error (reason) {
		console.log(error);
	}

	var mapOptions = {
		position: navigator.geolocation.getCurrentPosition(success, error),
		center: new google.maps.LatLong(position.latitude, position.longitude),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
};