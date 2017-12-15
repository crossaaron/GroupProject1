
  // Initialize Firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDTUUzcW3TOaVVeJbhgnpqNXW6oSE5pBR8",
    authDomain: "is-it-worth-it-con.firebaseapp.com",
    databaseURL: "https://is-it-worth-it-con.firebaseio.com",
    projectId: "is-it-worth-it-con",
    storageBucket: "is-it-worth-it-con.appspot.com",
    messagingSenderId: "67409493035"
  };
  firebase.initializeApp(config);

var database = firebase.database();


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
var callPictures = function(interestInput) {

$.ajax({
    url: "https://pixabay.com/api/?key="+"7371572-b4d7f234c51422f2be6d8c9f2"+"&q="+encodeURIComponent(interestInput),
    method: 'GET'
}).done(function (response){
    for (var i = 0; i < 4; i++) {
    $('.pictures').prepend("<img class = 'searchImages' src='" + response.hits[i].webformatURL + "'>");
    };
    console.log(response.hits[0].webformatURL);
    }
);
};


// Logic Below Here //
$(document).ready(function() {
    $("#getResults").on("click", function(event) {
    console.log("hi");
      event.preventDefault();
      var interest = $('#interest').val().trim();
        console.log(interest);
        callPictures(interest);



        var searchName;
        if ($("#name").val()) searchName = $("#name").val().trim();
        var searchLocation;
        if ($("#location").val()) searchLocation = $("#location").val().trim();
        var searchRadius;
        if ($("#searchRadius").val()) searchRadius = $("#searchRadius").val().trim();
        var searchInterest;
        if ($("#interest").val()) searchInterest = $("#interest").val().trim();


        // Create Database object

        var newInput = {
            name: searchName || "",
            location: searchLocation,
            radius: searchRadius,
            interest: searchInterest
        };
        database.ref().push(newInput);


        
});
    	
})

// Set Functions Below Here //

// Google maps
// function initMap() {
//     var uluru = {lat: -25.363, lng: 131.044};
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 4,
//       center: uluru
//     });
//     var marker = new google.maps.Marker({
//       position: uluru,
//       map: map
//     });
// }
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


