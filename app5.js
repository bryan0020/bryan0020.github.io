let timer;
let id;
let btn = document.querySelector('#find-me');
let tracking = false;

function startTimer() {
    trackMe();
    timer = setInterval(function() {
        trackMe();
    }, 5000);
}
 
function stopTimer() {
    clearInterval(timer);
    // navigator.geolocation.clearWatch(id);
}

function trackMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
    const details = document.querySelector('#details');

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let accuracy = position.coords.accuracy;
        let time = timeConverter(position.timestamp);

        status.innerHTML = 'Location found successfully!!! </ br> Will update every 5 seconds';
    
        mapLink.href = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=19/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    
        details.innerHTML =     'Latitude: '  + latitude + '<br />' +
                                'Longitude: ' + longitude + '<br />' +
                                'Accuracy: ' + accuracy + '<br />' +
                                'Time: ' + time + '<br />' +
                                '<hr />' + details.innerHTML;
    }

//     function error() {
//         status.textContent = 'Unable to retrieve your location';
//     }
    
    function error(err) {
        if (err.code == 1) {
            status.textContent = "Error: Access is denied!";
        } else if (err.code == 2) {
            status.textContent = "Error: Position is unavailable!";
        }
    }

    function timeConverter(UNIX_timestamp) {
        var d = new Date(UNIX_timestamp);
        return(d.toLocaleString());
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.innerHTML = 'Locating...';
        navigator.geolocation.getCurrentPosition(success, error, {
            // enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 30000 // large timeout to accomodate slow GPS lock on some devices
        });
    }
}

btn.addEventListener("click", function () {
    if (tracking) {
        btn.innerHTML = "Start tracking";
        tracking = false;
        stopTimer();
    } else {
        btn.innerHTML = "Stop tracking";
        tracking = true;
        startTimer();
    }
});
