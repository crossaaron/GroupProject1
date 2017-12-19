
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDGdubFGBJWrTFXCFG88AMlwmVyyG1zfP4",
    authDomain: "classdemo-743ef.firebaseapp.com",
    databaseURL: "https://classdemo-743ef.firebaseio.com",
    projectId: "classdemo-743ef",
    storageBucket: "classdemo-743ef.appspot.com",
    messagingSenderId: "109836927180"
  };
  

    firebase.initializeApp(config);

    var database = firebase.database();


// Pixabay
var callPictures = function(interestInput) {

$.ajax({
    url: "https://pixabay.com/api/?key="+"7371572-b4d7f234c51422f2be6d8c9f2"+"&q="+encodeURIComponent(interestInput),
    method: 'GET'
}).done(function (response){
    for (var i = 0; i < 10; i++) {
    $('#pixabay').prepend("<img class = 'searchImages' src='" + response.hits[i].webformatURL + "'>");
    };
    console.log(response.hits[0].webformatURL);
    }
);
};

//Google Places
    var initMap = function(latitude, longitude) {
        var uluru = {lat: latitude, lng: longitude};
        var map = new google.maps.Map(document.getElementById('map'), {
          center: uluru,
          zoom: 15
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
        console.log(latitude);
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

    $("#getResults").on("click", function(event) {
      event.preventDefault();
      var interest = $('#interest').val().trim();
        console.log(interest);
        callPictures(interest);
        hitSubmit();

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
            interest: searchInterest, 
        };
        database.ref().push(newInput);       
});
      
})
    

// Set Functions Below Here //


// Eventbrite
function hitSubmit() {
    $('#pixabay').empty();
    $('#eventBox').empty();
    $('.pictures').empty();
 
    const conSettings = {
        url: 'https://www.eventbriteapi.com/v3/events/search/',
        data: {
            token: 'PGYDBOPFSVG2QZQ64KDP', 
            sort_by: 'distance',  
            q: $("#interest").val().trim(),
            "location.address": $("#location").val(), 
            "location.within": $("#searchRadius").val().trim() + "mi",
            expand: 'venue'
              
        },
        "pagination": {
            "object_count": 5
        }, 
        crossDomain: true,
        method: 'GET'
     }
    $.ajax(conSettings).done(function(eventObject){
                
        const events = eventObject.events;
        const sfEvents = events.filter(function(event){
                console.log(event);
                console.log(event.name.text);
                console.log(event.description.text);
                console.log(event.end.utc);
                console.log(parseFloat(event.venue.address.latitude));
                console.log(event.venue.address.longitude);
                console.log(event.url);
        $("#eventBox").prepend('<div class="card listEntry"> <div class="card-header"> <div class="row"> <div class="col-md-3" id="name">' + event.name.text + '</div> <div class="col-md-3" id="price">' + '<a target="_blank" href="' + event.url + '">Tickets/Pricing</a></div> <div class="col-md-3" id="location">' +event.venue.address.city + '</div> <div class="col-md-3" id="date">' + event.end.utc + '</div> </div> </div> <div class="card-body"> <p class="card-text" id="eventDescription">' + event.description.text + '</p><div id="map"></div></div></div>');
        
            initMap(parseFloat(event.venue.address.latitude), parseFloat(event.venue.address.longitude));   

            return event.venue.address.city.toLowerCase() === $("#location").val().toLowerCase();

            
        });
    console.log(sfEvents.length);    
    });
}
