var button = document.querySelector("#find-me");
var count = document.querySelector("#count");
const locationID = '';

var running = false;

var number = 1;

var timer = new DeltaTimer(function () {
    count.innerHTML = number++;
}, 1000);

button.addEventListener("click", function () {
    if (running) {
        timer.stop();
        button.innerHTML = "Start tracking";
        running = false;
        stopTrack();
    } else {
        timer.start();
        button.innerHTML = "Stop tracking";
        running = true;
        trackMe();
    }
});

function DeltaTimer(render, interval) {
    var timeout;
    var lastTime;

    this.start = start;
    this.stop = stop;

    function start() {
        timeout = setTimeout(loop, 0);
        lastTime = Date.now();
        return lastTime;
    }

    function stop() {
        clearTimeout(timeout);
        return lastTime;
    }

    function loop() {
        var thisTime = Date.now();
        var deltaTime = thisTime - lastTime;
        var delay = Math.max(interval - deltaTime, 0);
        timeout = setTimeout(loop, delay);
        lastTime = thisTime + delay;
        render(thisTime);
    }
}

function stopTrack() {
    navigator.geolocation.clearWatch(locationID);
}

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

        status.textContent = 'Location found successfully';

        mapLink.href = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=19/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

        details.innerHTML = 'Latitude: '  + latitude + '<br />' +
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
        locationID = navigator.geolocation.watchPosition(success, error);
    }
    function timeConverter(UNIX_timestamp) {
        var d = new Date(UNIX_timestamp);
        console.log("d: " + d);
        return(d.toLocaleString());
    }
}
