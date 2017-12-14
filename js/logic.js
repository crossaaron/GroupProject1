// Initialize Variables Below Here //
const conSettings = {
    url: 'https://www.eventbriteapi.com/v3/events/search/',
    data: {token: 'PGYDBOPFSVG2QZQ64KDP', sort_by: 'distance',  'location.latitude': 37.7749, 'location.longitude': -122.4194, expand: 'venue'},
    crossDomain: true,
    method: 'GET'
 }

 // AJAX Calls

 // Eventbrite
 $.ajax(conSettings).done(function(eventObject){
    // All SF Area Events (Paginated by 50. Will only return first page.)
    const events = eventObject.events;
    // Create a new array of events whose venue is specifically in SF
    const conEvents = events.filter(function(event){
      return event.venue.address.city === 'San Francisco';
    });
    console.log(eventObject.events);    
 });

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




// Logic Below Here //
$(document).ready(function() {


    	

})

// Set Functions Below Here //

// Google maps
function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
}
