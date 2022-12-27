function trackMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
    const details = document.querySelector('#details');

    mapLink.href = '';
    mapLink.textContent = '';

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let time = timeConverter(position.timestamp);

        status.textContent = '<p>Successfully locate location</p><br>';

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

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating...';
        // navigator.geolocation.watchPosition(success, error, { timeout: 30000 });
        // navigator.geolocation.getCurrentPosition(success, error);
        navigator.geolocation.watchPosition(success, error);
    }
    function timeConverter(UNIX_timestamp) {
        var d = new Date(UNIX_timestamp);
        console.log("d: " + d);
        return(d.toLocaleString());
    }

    // Options: throw an error if no update is received every 30 seconds.
    // var watchID = navigator.geolocation.watchPosition(success, error, { timeout: 30000 });

}

document.querySelector('#find-me').addEventListener('click', setInterval(trackMe(), 10000));
