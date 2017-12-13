// Initialize Variables Below Here //

var interest = ""
var location = ""
var distance = ""

// AJAX Calls //
$.ajax({
    url: "https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=7KPSIMHAIA7KBMEV6X"
    method: "GET"
}).done(
    function (response){
        $.ajax({
            url: "https://www.eventbriteapi.com/v3/users/me/?token=PGYDBOPFSVG2QZQ64KDP/events/search"
            method: "GET"
        }).done(
            function(results)
        );
    }
);
// Logic Below Here //
$(document).ready(function() {

})

// Set Functions Below Here //