// onSuccess Callback
// This method accepts a `Position` object, which contains
// the current GPS coordinates
//
function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '  + position.coords.latitude + '<br />' +
                        'Longitude: ' + position.coords.longitude + '<br />' +
                        'Altitude: ' + position.coords.altitude + '<br />' +
                        'Accuracy: ' + position.coords.accuracy + '<br />' +
                        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                        'Heading: ' + position.coords.heading + '<br />' +
                        'Speed: ' + position.coords.speed + '<br />' +
                        'Original Timestamp: ' + position.timestamp + '<br />' +
                        'Timestamp: ' + timeConverter1(position.timestamp) + '<br />' +
                        '<hr />' + element.innerHTML;
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
}

// Options: throw an error if no update is received every 30 seconds.
//
var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });

function timeConverter1(UNIX_timestamp) {
    var d = new Date(UNIX_timestamp);
    console.log("d: " + d);
    return(d.toLocaleString());
}
