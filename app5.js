let timer;

function startTimer() {
    timer = setInterval(function() {
        trackMe();
    }, 5000);
}
 
function stopTimer() {
    clearInterval(timer);
}

function trackMe() {
    console.log("test");

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
    const details = document.querySelector('#details');

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let time = timeConverter(position.timestamp);
    
        status.innerHTML = 'Location found successfully!!!';
    
        mapLink.href = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=19/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    
        details.innerHTML =   'Latitude: '  + latitude + '<br />' +
                                'Longitude: ' + longitude + '<br />' +
                                'Time: ' + time + '<br />' +
                                '<hr />' + details.innerHTML;
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    function timeConverter(UNIX_timestamp) {
        var d = new Date(UNIX_timestamp);
        console.log("d: " + d);
        return(d.toLocaleString());
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.innerHTML = 'Locating...';
        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 30000 // large timeout to accomodate slow GPS lock on some devices
        });
    }
}

document.querySelector('#find-me').addEventListener('click', startTimer);
