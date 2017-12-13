// Initialize Variables Below Here //
var yelpKey = "i-A7nErw7MDEJwRipAmxYQ9VBBOt6lDWxiDNa6khg5f038W7y8S7qgqnezv4J2e5l0KtHWsWDZEJXqxhNrwkkuw2AAabs_ssS5z9Dt72AAtG9D9U8-iSqUaI1jksWnYx"
var eventKey = "7KPSIMHAIA7KBMEV6X"
var youtubeKey = "AIzaSyB6LbPrt3WHmEgdLBQUCa3DrYe7gsTEqSk"
var mapsKey = "AIzaSyCtXevtm_ndCcVgCNJPosfToHZWVQ-ct78"
var pixabayKey = "7371572-b4d7f234c51422f2be6d8c9f2"

// var API_KEY = '7371572-b4d7f234c51422f2be6d8c9f2';
// var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });







     $.ajax({
        url: "https://pixabay.com/api/?key="+pixabayKey+"&q="+encodeURIComponent('san diego'),
        method: 'GET'
 	 }).done(
            function (response){
            	for (var i = 0; i < 4; i++) {
            		// $('#pictures').attr("src", response.hits[0].webformatURL);
            		$('.pictures').prepend("<img class = 'searchImages' src='" + response.hits[i].webformatURL + "'>");
            	};

                console.log(response.hits[0].webformatURL);
            }
        );






// Logic Below Here //
$(document).ready(function() {


    	

})

// Set Functions Below Here //

const conSettings = {
    url: 'https://www.eventbriteapi.com/v3/events/search/',
    data: {token: 'PGYDBOPFSVG2QZQ64KDP', sort_by: 'distance',  'location.latitude': 37.7749, 'location.longitude': -122.4194, expand: 'venue'},
    crossDomain: true,
    method: 'GET'
 }
 
 $.ajax(conSettings).done(function(eventObject){
    // All SF Area Events (Paginated by 50. Will only return first page.)
    const events = eventObject.events;
    // Create a new array of events whose venue is specifically in SF
    const conEvents = events.filter(function(event){
      return event.venue.address.city === 'San Francisco';
    });
    console.log(eventObject.events);    
 });
// AJAX Calls //
// Logic Below Here //
// $(document).ready(function() {
// });
// Set Functions Below Here//
