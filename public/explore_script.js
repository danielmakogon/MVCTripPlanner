var myLatLng = { lat: 35.397, lng: -80.844 };
    var mapOptions = {
        center: myLatLng,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    
    };
    
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var directionsService = new google.maps.DirectionsService();
    
    var directionsDisplay = new google.maps.DirectionsRenderer();
    
    directionsDisplay.setMap(map);
    
    
    function calcRouteCity() {
        
        var request = {
            origin: document.getElementById("city").value,
            destination: document.getElementById("city").value,
            travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }
    
        //pass the request to route 
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
    
    
                //display route
                directionsDisplay.setDirections(result);
            } else {
                //delete route from map
                directionsDisplay.setDirections({ routes: [] });
                
                map.setCenter(myLatLng);
    
            }
        });
    
    }

    function calcRouteRest() {
        
        var request = {
            origin: document.getElementById("rest").value,
            destination: document.getElementById("rest").value,
            travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }
    
        //pass the request to route 
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
    
                
                //display route
                directionsDisplay.setDirections(result);
            } else {
                //delete route from map
                directionsDisplay.setDirections({ routes: [] });
                
                map.setCenter(myLatLng);
    
            }
        });
    
    }

    function calcRouteEst() {
        
        var request = {
            origin: document.getElementById("est").value,
            destination: document.getElementById("est").value,
            travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }
    
        //pass the request to route 
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
    
    
                //display route
                directionsDisplay.setDirections(result);
            } else {
                //delete route from map
                directionsDisplay.setDirections({ routes: [] });
                
                map.setCenter(myLatLng);
    
            }
        });
    
    }

    function calcRouteGas() {
        
        var request = {
            origin: document.getElementById("gas").value,
            destination: document.getElementById("gas").value,
            travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }
    
        //pass the request to route 
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
    
    
                //display route
                directionsDisplay.setDirections(result);
            } else {
                //delete route from map
                directionsDisplay.setDirections({ routes: [] });
                
                map.setCenter(myLatLng);
    
            }
        });
    
    }
    var cityOptions = {
        //optional constraints on autocomplete
        types: ['(cities)']
    }

    var restOptions = {
        //optional constraints on autocomplete
        types: ['establishment']
    }

    var estOptions = {
        //optional constraints on autocomplete
        types: ['establishment']
    }

    var gasOptions = {
        //optional constraints on autocomplete
        types: ['establishment']
    }

    var input1 = document.getElementById("city");
    var autocomplete1 = new google.maps.places.Autocomplete(input1, cityOptions);
    
    var input2 = document.getElementById("rest");
    var autocomplete2 = new google.maps.places.Autocomplete(input2, restOptions);

    var input3 = document.getElementById("est");
    var autocomplete3 = new google.maps.places.Autocomplete(input3, estOptions);

    var input4 = document.getElementById("gas");
    var autocomplete4 = new google.maps.places.Autocomplete(input4, gasOptions);