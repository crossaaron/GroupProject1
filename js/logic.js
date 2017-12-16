// Initialize Variables Below Here //

 // AJAX Calls

// Pixabay
$.ajax({
    url: "https://pixabay.com/api/?key="+"7371572-b4d7f234c51422f2be6d8c9f2"+"&q="+encodeURIComponent('san diego'),
    method: 'GET'
}).done(function (response){
    for (var i = 0; i < 4; i++) {
    $('.pictures').prepend("<img class = 'searchImages' src='" + response.hits[i].webformatURL + "'>");
    };
    console.log(response.hits[0].webformatURL);
    }
);

//Google Places
      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.866, lng: 151.196},
          zoom: 15
        });

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        service.getDetails({
          placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                place.formatted_address + '</div>');
              infowindow.open(map, this);
            });
          }
        });
      }
    


// Logic Below Here //
$(document).ready(function() {
    $("#get-results").on("click", function() {
        hitSubmit ();
    });
})

// Set Functions Below Here //

 // Eventbrite
 function hitSubmit(){
    const conSettings = {
        url: 'https://www.eventbriteapi.com/v3/events/search/',
        data: {
            token: 'PGYDBOPFSVG2QZQ64KDP', 
            sort_by: 'distance',  
            q: $("#event-name").val().trim(),
            "location.address": $("#location").val(), 
            "location.within": $("#searchRadius").val().trim() + "mi",
            expand: 'venue'  
        }, 
        crossDomain: true,
        method: 'GET'
     }
    $.ajax(conSettings).done(function(eventObject){
        // All SF Area Events (Paginated by 50. Will only return first page.)
        // for (var i = 0; i < 4; i++) {            
        const events = eventObject.events;
        const sfEvents = events.filter(function(event){
            events.forEach(pushEvent);

            function pushEvent(event){
                console.log(event);
            }
            return event.venue.address.city === $("#location").val();
        });
    });
 }
