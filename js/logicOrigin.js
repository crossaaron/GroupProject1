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
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var gsReference = storage.refFromURL('gs://classdemo-743ef.appspot.com/conImages/battlestar.jpeg')
    var picCount = 0
    var eventCount = 0


//Google Places
    var initMap = function(latitude, longitude) {
        var uluru = {lat: latitude, lng: longitude};
        var map = new google.maps.Map(document.getElementById('map'), {
          center: uluru,
          zoom: 15
        });

        var marker = new google.maps.Marker({
            position: uluru ,
            map: map
        });

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        
        service.getDetails({

          placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'},
        
            function(place, status) {
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

let sortValue = 'distance';
// Logic Below Here //
$(document).ready(function() {

  
    $("#getResults").on("click", function(event) {
      picCount = 0
      eventCount = 0
      if (($("#name").val()=="") || $("#interest").val()=="" || $("#location").val()=="" || $("#searchRadius").val()=="") {$('#validationMessage').html("You must fill out all fields.")}

        else {
          $('#eventBox').empty();
          $('#validationMessage').empty();

            hitSubmit();
        };

        var interest = $('#interest').val().trim();
        var searchName;
        if ($("#name").val()) searchName = $("#name").val().trim();
        var searchLocation;
        if ($("#location").val()) searchLocation = $("#location").val().trim();
        var searchRadius;
        if ($("#searchRadius").val()) searchRadius = $("#searchRadius").val().trim();
        var searchInterest;
      //might be something weird here...
        if ($("#interest").val()) searchInterest = $("#interest").val().trim();

        // Create Database object
        var newInput = {
            name: searchName || "",
            location: searchLocation,
            radius: searchRadius,
            interest: searchInterest, 
        };
        database.ref().push(newInput);

    $(".sort-button").on("click", function(event) {
        $('#eventBox').empty();
        sortValue = event.currentTarget.getAttribute('data-type');
        console.log(sortValue);
        hitSubmit();      
    });
      
    });
});
    


// Set Functions Below Here //

// Eventbrite
function hitSubmit() {

    const conSettings = {
        url: 'https://www.eventbriteapi.com/v3/events/search/',
        data: {
            token: 'PGYDBOPFSVG2QZQ64KDP', 
            sort_by: sortValue,  
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

         $("#eventBox").prepend('<div class="card listEntry"><div class="card-header"> <div class="row"> <div class="col-md-3" id="event-name">' + event.name.text + '</div> <div class="col-md-3" id="price">' + '<a target="_blank" href="' + event.url + '">Tickets/Pricing</a></div> <div class="col-md-3" id="location">' +event.venue.address.city + '</div> <div class="col-md-2" id="date">' + moment(event.end.utc).format("MMM,DD,YYYY") + '</div> </div> </div> <div class="card-body"> <div class="row"><div class=col-md-12><p class="card-text" id="eventDescription">' + event.description.text + '</p></div><div class="row"><div class="col-sm-12"><img class="col-sm-3" id="myimg0"><img class="col-sm-3" id="myimg1"><img class="col-sm-3" id="myimg2"><img class="col-sm-2" id="myimg3"></div></div><div class="col-md-12 googlemaps"><div id="map"></div></div>');

        // $("#eventBox").prepend('<div class="card listEntry"><div class="card-header"> <div class="row"> <div class="col-md-5" id="name">' + events[eventCount].name.text + '</div> <div class="col-md-2" id="price">' + '<a target="_blank" href="' + events[eventCount].url + '">Tickets/Pricing</a></div> <div class="col-md-2" id="location">' + events[eventCount].venue.address.city + '</div><div class="col-md-2" id="date">' + moment(events[eventCount].end.utc).format("MMM,DD,YYYY") + '</div> </div> </div> <div class="card-body"> <div class="row"><div class=col-md-12><p class="card-text" id="eventDescription">' + events[eventCount].description.text + '</p></div><div class="row"><div class="col-sm-12"><img class="col-sm-3" id="myimg0"><img class="col-sm-3" id="myimg1"><img class="col-sm-3" id="myimg2"><img class="col-sm-2" id="myimg3"></div></div><div class="col-md-12 googlemaps"><div id="map"></div></div>');

            getPics();
            initMap(parseFloat(event.venue.address.latitude), parseFloat(event.venue.address.longitude));
        
        
        eventCount++
       
        });
    });
}

// pull pictures from firebase storage
    function getPics() { 
        for (var i = 0; i < 4; i++) {
            picNumb = Math.floor(Math.random() * 24)

            storageRef.child('conImages/pic'+ picNumb + '.jpeg').getDownloadURL().then(function(url){

                var img = document.getElementById('myimg'+ picCount);
                img.src = url;
                console.log(img);
                picCount++
            });
        };
        
    };
    
