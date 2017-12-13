// Initialize Variables Below Here //


var interest = ""
var location = ""
var distance = ""

$.ajax({
    url: "https://www.eventbriteapi.com/v3/events/search?q="+interest+"&?q="+location+"&?q="+distance,
    method: "GET"
}).done(
    function (response){
        $(".city").text(response.city.name);
        console.log(response);
    }
);
// Logic Below Here //
$(document).ready(function() {

})

// Set Functions Below Here //