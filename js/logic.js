// Initialize Variables Below Here //
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