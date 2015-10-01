(function ($){
	$.maps = {
		userPos: null,
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
						  $.maps.userPos = {x: latitude, y: longitude};

						  console.log($.maps.userPos)
						  console.log($.maps.map)

						  $('.pin_form_lat').val(latitude);
						  $('.pin_form_long').val(longitude);

						  markers = $.maps.addMarker(latitude, longitude);
						  $.maps.map.bounds.extendWith(markers);
						  $.maps.map.fitMapToBounds();
						})
					}
				});
		},
		addMarker: function(latitude, longitude){
			markers = $.maps.map.addMarkers([
				{
					lat: latitude,
					lng: longitude,
					infowindow: "Hello"
				}
			]);
			console.log(markers);
			return markers;
		}
	};

})(jQuery);