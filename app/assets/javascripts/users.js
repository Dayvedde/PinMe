(function ($){
	$.maps = {
		userPos: null,
		currentDest: null,	//Store the current pin user selected
		styles: [
	         {
          "featureType":"all",
          "elementType":"labels.text.fill",
          "stylers":[
            {"saturation":36},
            {"color":"#000000"},
            {"lightness":40}
          ]
        },
        {
          "featureType":"all",
          "elementType":"labels.text.stroke",
          "stylers":[
            {"visibility":"on"},
            {"color":"#000000"},
            {"lightness":16}
          ]
        },
        {
          "featureType":"all",
          "elementType":"labels.icon",
          "stylers":[
            {"visibility":"off"}
          ]
        },
        {
          "featureType":"administrative",
          "elementType":"geometry.fill",
          "stylers":[
            {"color":"#000000"},
            {"lightness":20}
          ]
        },
        {
          "featureType":"administrative",
          "elementType":"geometry.stroke",
          "stylers":[
            {"color":"#000000"},
            {"lightness":17},
            {"weight":1.2}
          ]
        },
        {
          "featureType":"landscape",
          "elementType":"geometry",
          "stylers":[
            {"color":"#000000"},
            {"lightness":20}
          ] 
        },
        {
          "featureType":"poi",
          "elementType":"geometry",
          "stylers":[
            {"color":"#000000"},
            {"lightness":21}
          ]
        },
        {
          "featureType":"road.highway",
          "elementType":"geometry.fill",
          "stylers":[
            {"color":"#000000"},
            {"lightness":17}
          ]
        },
        {
          "featureType":"road.highway",
          "elementType":"geometry.stroke",
          "stylers":[
            {"color":"#000000"},
            {"lightness":29},
            {"weight":0.2}
          ]
        },
        {
          "featureType":"road.arterial",
          "elementType":"geometry",
          "stylers":[
            {"color":"#000000"},
            {"lightness":18}
          ]
        },
        {
          "featureType":"road.local",
          "elementType":"geometry",
          "stylers":[
            {"color":"#000000"},
            {"lightness":16}
          ]
        },
        {
          "featureType":"transit",
          "elementType":"geometry",
          "stylers":[
            {"color":"#000000"},
            {"lightness":19}
          ]
        },
        {
          "featureType":"water",
          "elementType":"geometry",
          "stylers":[
            {"color":"#000000"},
            {"lightness":17}
          ]
        }
	    ],
		map: null,
		init: function(){
			$.maps.map = Gmaps.build('Google');
		    $.maps.map.buildMap({ 	
			    	provider: {
		    			styles: $.maps.styles
		    		}, 
		    		internal: {id: 'gmap'}
		    	}, 
		    	function(){
					google.maps.event.addListener($.maps.map.getMap(),"zoom_changed", function(){
					//alert("hi");
					});

					//Set the current coordinates in text box
					if (navigator.geolocation){
						navigator.geolocation.getCurrentPosition(function(position){
						  var latitude = position.coords.latitude;
						  var longitude = position.coords.longitude;

						  $('.pin_form_lat').val(latitude);
						  $('.pin_form_long').val(longitude);

						  $.maps.userPos = $.maps.createMarker(latitude, longitude, "You are here");
						  console.log($.maps.userPos);
						  $.maps.map.bounds.extendWith($.maps.userPos);
						  $.maps.map.fitMapToBounds();
						})
					}
				});
		},
		createMarker: function(latitude, longitude, info){
			marker = $.maps.map.addMarkers([
				{
					lat: latitude,
					lng: longitude,
					infowindow: info
				}
			]);
			return marker;
		},
		getRoute: function(){
			userLat = $.maps.userPos[0].serviceObject.position.A;
			userLng = $.maps.userPos[0].serviceObject.position.F;
			destLat = $.maps.currentDest[0].serviceObject.position.A;
			destLng = $.maps.currentDest[0].serviceObject.position.F;

			var origin = new google.maps.LatLng(userLat, userLng);
			var destination = new google.maps.LatLng(destLat, destLng);
			var request = {
				origin: origin,
				destination: destination,
				travelMode: google.maps.TravelMode.DRIVING
			};
			directionsService.route(request, function(response, status){
				if (status == google.maps.DirectionsStatus.OK){
					directionsDisplay.setDirections(response);
				}
			});
		}
	};

})(jQuery);